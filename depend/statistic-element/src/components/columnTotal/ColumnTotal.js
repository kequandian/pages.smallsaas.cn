/**
    * @author Yang,YN  2018-9-6
    * @editor
    * @updated
    * @desc
    * @eg
    <ColumnTotal>
      name = ''
      value = ''
      style = {},   //调整外层样式（长宽、背景等）
      nameStyle = {},   //修改name的样式
      valueStyle = {}   //修改value的样式
    </ColumnTotal>
 */

import React from 'react';
import { query } from 'kqd-utils/lib/services';

class ColumnTotal extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const { name,value,icon } = this.props;

    const style = {
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      background:'rgba(242, 242, 242, 1)',
      height: '180px',
      margin:'1em',
      fontSize: '15px',
      color: '#333',
      ...this.props.style
    }

    const nameStyle = {
      marginBottom: '1em',
      ...this.props.nameStyle
    }

    const valueStyle = {
      textAlign: 'center',
      ...this.props.valueStyle
    }

    const iconStyle = {
      width:'35px',
      position: 'absolute',
      top: '2em',
      left: '2em',
      ...this.props.iconStyle
    }

    return (
      <div style={style}>
        <div>
          { icon ? <img src={icon} style={iconStyle}/> : null }
          <div style={nameStyle}>{name}</div>
          <div style={valueStyle}>{value}</div>
        </div>
      </div>
    )
  }
}

export default ColumnTotal;
