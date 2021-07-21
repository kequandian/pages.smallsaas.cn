import React, { Component } from 'react';
import classnames from 'classnames';
import { ListItem } from 'kqd-list-item-element';
import TabItem from './TabItem';
import './index.css';

export default class TabLayout extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: props.defaultActiveKey || props.value || '',
    };
    this.valueField = props.valueField || 'id';
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.value !== undefined && this.state.activeKey !== nextProps.value){
      this.setState({
        activeKey: nextProps.value,
      });
    }
  }
  handleClick = (index,data) => {
    const { onChange } = this.props;
    
    this.setState({
      activeKey: data[this.valueField],
    })
    if(onChange){
      onChange(data[this.valueField]);
    }
  }
  render(){
    const { tabPosition = 'top', tabsData, style } = this.props;
    const { activeKey } = this.state;
    const className = classnames({
      tabsBox: true,
      left: tabPosition === 'left',
    });
    
    return <div className={ className } style={ style }>
      <ListItem
        data={ tabsData }
        value={ activeKey }
        valueField={ this.valueField }
        activeClass="active"
        onClick={ this.handleClick }
        >
        <TabItem />
      </ListItem>
   </div>
  }
}