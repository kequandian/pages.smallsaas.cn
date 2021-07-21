/**
    * @author
    * @editor
    * @updated
    * @desc   规格的添加与编辑
    * @eg
    <Specification>
      value = ''
      isfirsttimeinit = 'true'
      onChange = {(data) => {}}
    </Specification>
 */

import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Table from 'antd/lib/table';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import queryString from 'querystring';
import InputTeext from '../components/InputText';
import './style.css';

/**
 * 规格的添加与编辑
 */
export default class Specification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.value ? 'edit' : 'create',
      value: props.value ? props.value : [],
      specificationList: [
        // { groupName: '规格', items: ['默认'] },
        // { groupName: '颜色', items: ['红','绿','蓝'] },
        // { groupName: '内存大小', items: ['3G','4G'] },
        // { groupName: '存储大小', items: ['32G','64G','128G','256G'] }
      ],
    };
    this.editColumns = [
      { title: '移除规格',dataIndex: 'remove', width: '8em', align: 'center',
        render: (text,record,index) => (<Icon type="delete" className="deleteIcon" onClick={ this.handleRemoveItem.bind(null,index) } />) },
      { title: '规格名称', dataIndex: 'groupName', width: '14em', render: (text,record,index) => (<InputTeext defaultValue={text} onChange={ this.handleEditName.bind(null,index) } />) },
      { title: '规格值', dataIndex: 'items', render: (text,record,index) => (<Select defaultValue={text} mode="tags" dropdownStyle={{display: 'none'}} onBlur={ this.handleEditValue.bind(null,index) } />) },
    ]
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      this.getData();
    }
    // const [ ...value ] = this.state.value;
    // const specificationList = [];
    // if( value.length > 0){
    //   value.forEach( item => {
    //     specificationList.push({
    //       key: + new Date(),
    //       id: item.id,
    //       groupName: item.groupName,
    //       items: item.items.map( child => {
    //         return child.groupName;
    //       } ),
    //     });
    //   });
    // }
    // this.setState({
    //   specificationList,
    // });
  }

  getData = () => {
    let API = '/api/wms/sku/category/{ID}/specifications';
    // 注意，这里使用了 window 下面的 location
    const id = queryString.parse(window.location.href).id;
    if( id ){
      API = API.replace('{ID}',id);
      query(API).then(({ code, data }) => {
        if( code === 200 ){
          let listData = data.groups || data.records || data;
          if( listData === '' ) listData = [];
          const specificationList = [];
          if( listData.length > 0){
            listData.forEach( item => {
              specificationList.push({
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
            specificationList,
            value: listData,
          });
        }
      });
    }
  }

  // 编辑规格名
  handleEditName = (i,v) => {
    const [ ...specificationList ] = this.state.specificationList;
    specificationList[i].groupName = v;
    this.handleSave(specificationList);
  }

  /**
   * 编辑规格值
   */
  handleEditValue = (i,v) => {
    const [ ...specificationList ] = this.state.specificationList;
    specificationList[i].items = v;
    this.handleSave(specificationList);
  }
  handleAddItem = () => {
    const [ ...specificationList ] = this.state.specificationList;

    this.handleSave([ ...specificationList, { key: + new Date(), groupName: `新建规格${specificationList.length + 1}`, items: [] } ]);
  }
  handleRemoveItem = (i) => {
    const [ ...specificationList ] = this.state.specificationList;
    // Modal.warning({
    //   title: '移除规格失败',
    //   content: '请至少保留一个规格'
    // });
    specificationList.splice(i,1);
    this.handleSave(specificationList);
  }

  /**
   * 保存数据到 form
   */
  handleSave = (specificationList) => {
    this.setState({
      specificationList
    }, () => {
      const specificationList = JSON.parse(JSON.stringify(this.state.specificationList)); // 确保深拷贝

      const { value } = this.state;
      specificationList.forEach( item => {
        delete item.key;
        item.items = item.items.map( child => {
          if( typeof( child ) === 'object' ){
            child = child.groupName;
          }
          if( item.id !== undefined ){
            // 有 id 话，表明是修改而不是新增。故把 items 的 id 补充回来
            const rst = value.find( v => v.id === item.id );
            const childRst = rst.items.find( c => c.groupName === child );
            if( childRst ){
              // 找到 child 的话，直接使用找到的 child
              return childRst;
            }else{
              return { groupName: child };
            }
          }else{
            return { groupName: child };
          }
        } );
      } );
      this.props.onChange( specificationList );
    });
  }

  render() {
    const { specificationList } = this.state;

    return (
      <Fragment>
        <Row>
          <Col span={ 24 }>
          <Table
            dataSource={ specificationList }
            columns={ this.editColumns }
            rowKey="key"
            pagination={ false }
            footer={ () => <Button type="primary" icon="plus" onClick={ this.handleAddItem }>添加规格</Button> }
          />
          </Col>
        </Row>
      </Fragment>
    )
  }
}
