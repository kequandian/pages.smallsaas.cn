/**
    * @author
    * @editor
    * @updated
    * @desc  根据已有规格信息，做笛卡尔积
    * @eg
    <ProductSpecification>
      value = []
      isfirsttimeinit = 'true'
      productCategoryId = ''    //产品类别id
      onChange = {(data) =>{}}  //点击保存的时候触发回调
    </ProductSpecification>
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Table from 'antd/lib/table';
import Checkbox from 'antd/lib/checkbox';

import { cartesianProduct } from './utils';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import InputText from '../components/InputText';
import ImageUpload from '../components/ImageUpload';

/**
 * 根据已有规格信息，做笛卡尔积
 */
export default class ProductSpecification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      more: false,
      type: props.value ? 'edit' : 'create',
      value: props.value ? props.value : [],
      enableSpecificationList: [], //被勾选中的规格
      tableDataSource: [],
      saveData: [], //准备提交的数据
    };
    this.specificationList = [ // 分类下的全部规格
      // { id: 0, groupName: '颜色', items: [ { id: 101, groupName: '红' }, { id: 102, groupName: '绿' }, { id: 103, groupName: '蓝' } ] },
      // { id: 1, groupName: '内存大小', items: [ { id: 201, groupName: '3G' }, { id: 202, groupName: '4G' }, { id: 203, groupName: '6G' } ] },
      // { id: 2, groupName: '存储大小', items: ['32G','64G','128G','256G'] }
    ];
    this.productCategoryId = null; //缓存上次分类的 id
  }

  static contextTypes = {
    form: PropTypes.object,
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      this.getData();
      let [ ...value ] = this.state.value;
      value = value.items;
      const enableSpecificationList = [];
      if( value.length > 0){
        value.forEach( item => {
          item.specId = item.specId || [];
          enableSpecificationList.push({
            key: + new Date(),
            id: item.id,
            groupName: item.groupName,
            items: item.items.map( child => {
              return child.groupName;
            } ),
          });
        });
      }
      this.setState({
        enableSpecificationList,
      });
    }
  }
  componentDidUpdate() {
    this.getData();
  }

  getData = () => {
    let API = '/api/wms/sku/category/{ID}/specifications';
    const fields = this.context.form.getFieldsValue([this.props.productCategoryId]);
    if( fields.productCategoryId && fields.productCategoryId !=='' && this.productCategoryId !== fields.productCategoryId ){
      this.productCategoryId = fields.productCategoryId;
      API = API.replace('{ID}',fields.productCategoryId);
      query(API).then(({ code, data }) => {
        if( code === 200 ){
          let listData = data.groups || data.records || data;
          if( listData === '' ) listData = [];
          this.specificationList = listData;
          this.productCategoryId = fields.productCategoryId;
          this.forceUpdate();
        }
      });
    }
  }

  getTableDataSource = () => {
    const { enableSpecificationList, saveData } = this.state;
    let data = [];
    // 使用 productCodeField ，或者 临时使用 时间戳 作为skuCode
    const fields = this.context.form.getFieldsValue([this.props.productCodeField]);
    const skuCode = fields[this.props.productCodeField] || + new Date();
    const list = cartesianProduct( enableSpecificationList.length > 0 ? enableSpecificationList.map( v => v.items ): enableSpecificationList );
    // console.log(list);
    for(let i = 0; i < list.length; i++){
      let temObj = {};
      list[i].forEach( (v,i) => {
        temObj[`specification_${ enableSpecificationList[i].id }`] = v.groupName;
      });
      data.push({
        id: i,
        enable: true,
        imageUrl: undefined,
        skuCode: `${skuCode}${i}`,
        barCode: '',
        skuPrice: 0,
        ...temObj,
      });
      saveData.push({
        enable: true,
        items: list[i].map( item => item.id ),
        imageUrl: undefined,
        skuCode: `${skuCode}${i}`,
        skuPrice: 0,
      });
    }
    this.handleSave(data,saveData);
  }
  getCheckbox = () => {
    const { specificationList } = this;
    return specificationList.map( (v,i) => (<Checkbox key={i} onChange={ this.handleCheckBoxChange.bind(null,v) }>{ v.groupName }</Checkbox>));
  }
  handleCheckBoxChange = (specification,e) => {
    const { enableSpecificationList } = this.state;
    const enableList = e.target.checked ?
      [...enableSpecificationList,specification]
      : enableSpecificationList.filter(t => t.groupName !== specification.groupName);

    this.setState({
      enableSpecificationList: enableList,
    }, () => {
      this.getTableDataSource();
    });
  }
  handleEditPrice = (index,value) => {
    const [ ...tableDataSource ] = this.state.tableDataSource;
    const [ ...saveData ] = this.state.saveData;
    tableDataSource[index].skuPrice = value;
    saveData[index].skuPrice = value;

    this.handleSave(tableDataSource,saveData);
  }
  handleBarCodePrice = (index,value) => {
    const [ ...tableDataSource ] = this.state.tableDataSource;
    const [ ...saveData ] = this.state.saveData;
    tableDataSource[index].barCode = value;
    saveData[index].barCode = value;

    this.handleSave(tableDataSource,saveData);
  }
  handleImageChange = (index,value) => {
    const [ ...tableDataSource ] = this.state.tableDataSource;
    const [ ...saveData ] = this.state.saveData;
    tableDataSource[index].imageUrl = value;
    saveData[index].imageUrl = value;

    this.handleSave(tableDataSource,saveData);
  }

  getColumns = () =>{
    const { enableSpecificationList } = this.state;
    // const { drawSpecification } = this;
    let columns = [
      { title: '启用', dataIndex: 'enable', width: '6em', align: 'center', render: (text,record) => (<Checkbox checked={text} onChange={ this.changeItemState.bind(null,record) }></Checkbox>) },
      { title: '图片', dataIndex: 'imageUrl', render: (text,record,index) => (<ImageUpload onChange={ this.handleImageChange.bind(null,index) }></ImageUpload>) },
      { title: '商品编码', dataIndex: 'skuCode' },
      { title: '条形码', dataIndex: 'barCode', render: (text,record,index) => (<InputText type="input" onChange={ this.handleBarCodePrice.bind(null,index) }></InputText>) },
      { title: '价格', dataIndex: 'skuPrice', render: (text,record,index) => (<InputText type="number" step={ 0.01 } onChange={ this.handleEditPrice.bind(null,index) }></InputText>) },
    ];
    columns.splice(2,0, ...enableSpecificationList.map( (v,i) => ({ title: v.groupName, dataIndex: `specification_${v.id}`, }) ));
    return columns;
  }
  /**
   * 禁用某一规格
   */
  changeItemState = ({ id }) =>{
    let { tableDataSource, saveData } = this.state;

    tableDataSource = [ ...tableDataSource ];
    tableDataSource[id].enable = !tableDataSource[id].enable;
    saveData = [ ...saveData ];
    saveData[id].enable = !saveData[id].enable;

    this.handleSave(tableDataSource,saveData);
  }
  /**
   * 保存数据到 form
   */
  handleSave = (tableDataSource, saveData) => {
    this.setState({
      tableDataSource,
      saveData,
    }, () => {
      const saveData = JSON.parse(JSON.stringify(this.state.saveData)); // 确保深拷贝

      // const { value } = this.state;
      console.log('saveData',saveData);
      // saveData.forEach( item => {
      //   delete item.key;
      //   item.specId = item.items;
      //   delete item.items;
      //   // item.specId = item.items.map( child => {
      //   //   if( typeof( child ) === 'object' ){
      //   //     child = child.groupName;
      //   //   }
      //   //   if( item.id !== undefined ){
      //   //     // 有 id 话，表明是修改而不是新增。故把 specId 的 id 补充回来
      //   //     const rst = value.find( v => v.id === item.id );
      //   //     const childRst = rst.specId.find( c => c.groupName === child );
      //   //     if( childRst ){
      //   //       // 找到 child 的话，直接使用找到的 child
      //   //       return childRst;
      //   //     }else{
      //   //       return { groupName: child };
      //   //     }
      //   //   }else{
      //   //     return { groupName: child };
      //   //   }
      //   // } );
      // } );

      this.props.onChange( saveData.filter( item => {
        const enable = item.enable;
        delete item.key;
        delete item.enable;
        item.specId = item.items;
        delete item.items;
        return enable === true;
      } ) );
    });
  }

  render() {
    const { tableDataSource } = this.state;

    return (
      <Fragment>
        <div>
          商品含有的规格: { this.getCheckbox() }
        </div>
        <Table
          dataSource={ tableDataSource }
          columns={ this.getColumns() }
          rowKey="skuCode"
          pagination={ false }
        />
      </Fragment>
    )
  }
}
