/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <ClickPicker>
      API = ''
      value = ''
      placeholder = ''
      options = {}
      onChange = {(data) => {}}
    </ClickPicker>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import Picker from './Picker';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';

class ClickPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [], // { name: '张三', id: '1' }
      API: props.API || '',
      value: props.value,
      modalState: false,
      index: 0,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () =>{
    if(this.state.list.length > 0){
      return false;
    }else{
	    const { API, value } = this.state;
      query(API).then(({ code, data }) => {   //查询api，获取数据
        data = data.records || data.list || data || [];
        const newValue = data[data.findIndex( v => v.id === value)] ? data[data.findIndex( v => v.id === value)] : value;

        this.setState({
          list: data,
          value: newValue,
        })
      })
    }
  }
  handleChange = (index) => {
    this.setState({ index });
  }
  handleSave = () => {
    const { index } = this.state;
    this.setState({ value: this.state.list[index].name || this.state.list[index].id, modalState: false });

    this.props.onChange(this.state.list[index].id);
  }
  handleClick = () => {
    this.setState({
      modalState: !this.state.modalState,
    });
  }
  handleOk = () => {
    this.handleSave();
  }


  render() {
    const { list, value, modalState } = this.state;
    const { placeholder, options } =this.props;
    // console.log('ClickPicker',this);

    return (
      <div>
        <Button onClick={ this.handleClick }>{ value || '请选择……' }</Button>
        <Modal visible={ modalState } title={ options.title } width={ options.width }
          onCancel={ this.handleClick } onOk={ this.handleOk } >
          <Picker
            data={ list }
            value={ value }
            onChange={ this.handleChange }
          >
          </Picker>
        </Modal>
      </div>
    )
  }
}

export default ClickPicker;
