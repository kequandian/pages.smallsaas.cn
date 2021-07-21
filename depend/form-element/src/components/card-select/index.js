/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <CardSelect>
      value = []
      onChange = {(data) => {}}
    </CardSelect>
 */

import React, { Component, Fragment } from 'react';
import { ImageAdaptive, TextEllipsis } from 'kqd-common';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import ProductSelect from '../components/productSelect';

import './index.css';

export default class CardSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      rstData: props.value || [],
    };
  }
  componentDidMount(){
    this.props.onChange( this.state.rstData.map( item => ({targetId: item.id}) ) );
  }
  handleMoadlVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handleAddItem = (selectedItem) => {
    const { rstData } = this.state;
    const filterList = [];
    selectedItem.forEach( item => {
      const rst = rstData.some( i => {
        return i.id === item.id;
      } );
      if(!rst){
        filterList.push(item);
      }
    } );
    this.setState( {
      rstData: [ ...rstData, ...filterList ],
      modalVisible: false,
    }, () => {
      this.props.onChange( this.state.rstData.map( item => ({targetId: item.id}) ) );
    });
  }
  handRemoveItem = (id) => {
    const { rstData } = this.state;
    this.setState({
      rstData: rstData.filter( item => item.id !== id )
    }, () => {
      this.props.onChange(this.state.rstData.map( item => ({targetId: item.id}) ));
    });
  }

  render(){
    const { modalVisible, rstData } = this.state;
    return <Fragment>
      <Row>
        { rstData.map( (item,i) => {
          return (
            <Col key={i} span={ 4 } className="kqd-card-select-itemBox" title={ item.name }>
              <Icon type="close" className="kqd-card-select-close" onClick={ this.handRemoveItem.bind(this,item.id) } />
              <ImageAdaptive data={{
                url: item.cover,
              }} />
              <TextEllipsis data={{
                title: item.name
              }} />
            </Col>
          );
        } ) }
      </Row>
      <Button type="primary" icon="plus" onClick={ this.handleMoadlVisible }>新增</Button>
      <ProductSelect modalVisible={ modalVisible } onCancel={ this.handleMoadlVisible } onOk={ this.handleAddItem } />
    </Fragment>
  }
}
