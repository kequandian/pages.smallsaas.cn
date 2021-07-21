/**
    * @author Yang,YN  2018-9-6
    * @editor LLH
    * @updated 2018年10月9日
    * @desc
    * @eg
    <ColumnChain>
      title = ''       //标题
      subTitle =''     //副标题
      value =''        //值
      note = ''        //备注
      iconType = ''    //图标箭头类型，默认是向上
    </ColumnChain>
 */


import React from 'react';
import { Icon } from 'antd';

class ColumnChain extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const { title,subTitle,value,note,iconType } = this.props;

    const style = {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: '1em',
      width: '200px',
      ...this.props.style
    }

    const titleStyle = {
      color: '#000',
      ...this.props.titleStyle
    }

    const valueStyle = {
      color: '#0084FF',
      fontSize: '20px',
      padding: '0.2em 0',
      ...this.props.valueStyle
    }

    const subTitleStyle = {
      padding: '0.2em 0',
      ...this.props.subTitleStyle
    }

    const noteStyle = {
      padding: '0.2em 0',
      ...this.props.noteStyle
    }

    const iconStyle = {
      marginLeft: '0.5em',
      color: iconType && iconType == 'up' ? 'red' : 'green',
      ...this.props.iconStyle
    }

    return (
      <div style={style}>
        <div style={titleStyle}>{title}</div>
        <div style={valueStyle}>{value}</div>
        { subTitle ?
          (<div style={subTitleStyle}>昨日：{subTitle}</div>)
          : null }
        { note ?
          <div style={noteStyle}>
            下降：{note}
            <Icon type= { iconType && iconType == 'up' ? 'arrow-up' : 'arrow-down'} style={iconStyle}/>
          </div>
          : null
        }
      </div>
    )
  }
}

export default ColumnChain;
