/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <UnitsAelect>
      value = ''
      isfirsttimeinit = 'true'
      API = ''
      onChange = {(data) =>{}}
      placeholder = ''
    </UnitsAelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import SelectModify from './select-modify';
import { Row, Col, Checkbox, Icon, Modal, Input, message } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import InputText from '../components/InputText';
import './index.css';

const confirm = Modal.confirm;

class UnitsAelect extends React.Component {

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      list:[],
      API: '/api/wms/sku/units',
      addVisible: false,
      newUnitsValue: undefined,
      moreUnits: false,
      moreUnitsVisible: false,
      // 多单位
      baseUnit: value.unitId, //基础单位的 ID
      pUnitId: value.pUnitId,
      grandPunitId: value.grandPunitId,
      getpValue: 0,
      grandValue: 0,
    }
    this.addUnitsCount = 0;
    this.queryCount = 0;
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      this.getData();
    }
  }
  getData = () =>{
    const { API = this.state.API } = this.props;
    query(API).then(({ code, data }) => {
      data = data.records || data;
      this.setState({
        list: data
      })
    })
  }
  handelFocus = () => {
    if( this.addUnitsCount > this.queryCount ){
      this.queryCount = this.addUnitsCount;
      this.getData();
    }
  }

  createNewUnit = (unitName) => {
    create('/api/wms/sku/units', { unitName })
    .then((response) => {
      if(response.code === 200){
        message.success('新增单位成功');
      }else{
        message.error(response.message);
      }
    })
  }

  handleChange = (key,id) => {
    if(key){
      this.setState({
        [key]: id,
      });
    }else{
      this.setState({
        baseUnit: id,
      });
      this.props.onChange({
        unitId: id,
      });
    }
  }
  handleModalStatus = () =>{
    this.setState({
      addVisible: !this.state.addVisible,
      newUnitsValue: undefined,
    });
  }
  handleUnitsChange = (v) => {
    this.setState({
      newUnitsValue: v,
    });
  }
  handleSaveUnits = () => {
    this.createNewUnit(this.state.newUnitsValue);
    this.addUnitsCount += 1;
    this.handleModalStatus();
  }

  handleValueChange = (key,e) => {
    this.setState({
      [key]: e.target.value,
    });
  }

  handleSwitch = (e) => {
    const value = e.target.checked;
    if( value === false ){
      confirm({
        title: '取消多单位',
        content: '确定要取消多单位吗？',
        onOk: function(_this){
          _this.setState({
            moreUnitsVisible: false,
            moreUnits: false,
          });
        }.bind(null,this) ,
        onCancel() {},
      });
      return false;
    }
    this.setState({
      moreUnitsVisible: value,
      moreUnits: value,
    });
  }
  handleMoreModalCancel = () =>{
    this.setState({
      moreUnitsVisible: false,
      moreUnits: false,
    });
  }
  handleMoreModalOk = () => {
    const { baseUnit, pUnitId, grandPunitId } = this.state;
    this.props.onChange({
      unitId: baseUnit,
      pUnitId,
      grandPunitId,
    });
    this.setState({
      moreUnitsVisible: false,
    });
  }

  getValueFromId = (id) => {
    const { list } = this.state;
    const findItem = list.find( item => item.id === id) || {};
    return findItem.unitName;
  }
  getIdFromValue = (value = {}) => {
    return value.unitId;
  }
  /**
   *
   * - value 当前选择的单位
   * - addonBefore 输入框前修饰
   * - key 保存到其它 key
   */
  renderUnitsSelect = (value,addonBefore,key = false) => {
    const { list } = this.state;
    const { placeholder } =this.props;
    return <SelectModify
      showSearch
      style={{ width: '100%' }}
      onFocus={ this.handelFocus }
      onChange={ this.handleChange.bind(this,key) }
      value={ value }
      addonBefore={ addonBefore }
      placeholder={ placeholder || '请选择单位' }
      dropdownMenuExtra={<div className="kc-units-select-add-units" onClick={ this.handleModalStatus }><Icon type="plus" /> 新增单位</div>}
    >
      {
        list.length > 0 && list.map((item,index) => (
          <SelectModify.Option key={index} value={ item.id } type="SelectModifyOption">{ item.unitName }</SelectModify.Option>
        ))
      }
    </SelectModify>
  }


  render() {
    const { list, addVisible, moreUnitsVisible, moreUnits, baseUnit } = this.state;
    const { pUnitId, grandPunitId, getpValue, grandValue } = this.state;
    const addModalProps = {
      visible: addVisible,
      title: '新增单位',
      destroyOnClose: true,
      zIndex: 1100,
      onCancel: this.handleModalStatus,
      onOk: this.handleSaveUnits,
    };
    const moreUnitsModalProps = {
      visible: moreUnitsVisible,
      title: '多单位设置',
      destroyOnClose: true,
      onCancel: this.handleMoreModalCancel,
      onOk: this.handleMoreModalOk,
    };

    return (
      <Row>
        <Col span={ 14 }>
          { this.renderUnitsSelect( this.getIdFromValue(this.props.value) ) }
        </Col>
        <Col span={ 10 } style={{textAlign: 'right'}}>
          <Checkbox onChange={ this.handleSwitch } checked={ moreUnits }>
            使用多单位
          </Checkbox>
        </Col>
        <Modal { ...addModalProps }>
          <Row type="flex" align="middle">
            <Col span={ 4 }>单位名称：</Col>
            <Col span={ 20 }>
              <InputText onChange={ this.handleUnitsChange } />
            </Col>
          </Row>
        </Modal>
        <Modal { ...moreUnitsModalProps }>
          <Row type="flex" align="middle">
            <Col span={ 4 }>基础单位：</Col>
            <Col span={ 20 }>
              { this.renderUnitsSelect( this.getIdFromValue(this.props.value) ) }
            </Col>
          </Row>
          <br /><br />
          <Row type="flex" align="middle">
            <Col span={ 4 }>副单位1：</Col>
            <Col span={ 8 }>
              { this.renderUnitsSelect( pUnitId, 1, 'pUnitId' ) }
            </Col>
            <Col span={ 1 } className="kc-units-select-textAlign-center"> = </Col>
            <Col span={ 11 }>
              <Input placeholder="换算比例" value={ getpValue } onChange={ this.handleValueChange.bind(this,'getpValue') } addonAfter={ this.getValueFromId(baseUnit) } />
            </Col>
          </Row>
          <br /><br />
          <Row type="flex" align="middle">
            <Col span={ 4 }>副单位2：</Col>
            <Col span={ 8 }>
            { this.renderUnitsSelect( grandPunitId, 1, 'grandPunitId' ) }
            </Col>
            <Col span={ 1 } className="kc-units-select-textAlign-center"> = </Col>
            <Col span={ 11 }>
              <Input placeholder="换算比例" value={ grandValue } onChange={ this.handleValueChange.bind(this,'grandValue') } addonAfter={ this.getValueFromId(baseUnit) } />
            </Col>
          </Row>
        </Modal>
      </Row>
    )
  }
}

export default UnitsAelect;
