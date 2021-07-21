import React,{ Fragment, Component } from 'react';
import { remove, create } from 'kqd-utils/lib/services';
import queryString from 'query-string';
import { TitledHeader } from 'kqd-page-header';

import { Rate, Button, Modal, Input, Divider } from 'antd';

import { ImageAdaptive, ImageView } from 'kqd-common';
import { GMApp } from 'kqd-general';
import { LRLayout } from 'kqd-layout-flex';

const { TextArea } = Input;
const { TitleLayout, List } = GMApp;

import './style.css';

export default class Quert extends Component {
  state = {
    visible: false,
    value: '',
  }
  componentDidMount(){
    const { requester } = this.props;
    // requester.fetchOne({
    //   API: '/api/wms/skus/[stockId]',
    // },'skuData');
    requester.fetchOne({
      API: '/api/gw/product/comments/[orderNumber]',
    },'orderData');
  }
  createHTML = (content) => {
    return {__html: content};
  }
  changeModalStatus = () => {
    this.setState({
      visible: !this.state.visible,
      value: '',
    });
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value,
    });
  }
  handleSubmit = () => {
    const { requester, location, modelStatus } = this.props;
    const { value } =  this.state;
    const { orderData = {} } = modelStatus;
    const queryObj = queryString.parse(location.search.replace('?',''));
    requester.createForm({
      content: value,
      stockId: orderData.evaluations[0].id,
      stockType: 'Evaluation',
      originId: queryObj.stockId,
      originType: 'Product',
      tradeNumber: queryObj.orderNumber,
      requestConfig: {
        callback: _=> {
          requester.fetchOne({
            API: '/api/gw/product/comments/[orderNumber]?isLayered=true',
          },'orderData');
        }
      }
    });
    this.changeModalStatus();
  }

  updateComment = () => {
    this.commentRef.props.onChange({ current: 1 });
  }
  handleDelete = (id,data) => {
    const { updateComment } = this;
    confirm({
      title: '确定要删除这条评价吗？',
      content: data.content,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove(`/api/cms/evaluations/${id}`)
        .then( () => {
          updateComment();
        });
      },
      onCancel() {},
    });
  }
  handleDeleteItem = (id,data) => {
    const { updateComment } = this;
    confirm({
      title: '确定要删除这条追加的评价吗？',
      content: data.content,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove(`/api/cms/evaluation/addition/${id}`)
        .then( () => {
          updateComment();
        });
      },
      onCancel() {},
    });
  }
  // 回复/追加 评价
  handleAdd = (id,data) => {
    create(`/api/cms/evaluation/${id}/pub/addition`,{
      content: data,
    })
    .then( _=>{
      this.updateComment();
    } )
  }
  // 直接评价
  handleComment = (data) => {
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?',''));
    create('/api/cms/evaluations',{
      stockId: queryObj.id,
      stockType: 'Product',
      content: data,
    })
    .then( _=> {
      this.updateComment();
    } )
  }
  getRate = (data) => {
    let rst = 0;
    try {
      rst = data.evaluations[0].stockEvaluationStars[0].starValue;
    } catch (error) {
      
    }
    return rst;
  }
  getAvatar = (data) => {
    let rst = '';
    try {
      rst = data.evaluations[0].avatar;
    } catch (error) {
      
    }
    return rst;
  }
  getUserName = (data) => {
    let rst = '';
    try {
      rst = data.evaluations[0].user_name;
    } catch (error) {
      
    }
    return rst;
  }

  render(){
    const { modelStatus, dataPool, requester, dispatch, location, namespace } = this.props;
    const { orderData = {} } = modelStatus;
    const { visible, value } = this.state;
    const modalProps = {
      visible,
      title: '添加回复',
      destroyOnClose: true,
      onCancel: this.changeModalStatus,
      onOk: this.handleSubmit,
    };
    
    const statusMap = {
      'CREATED_PAY_PENDING': '待支付',
      'CLOSED_PAY_TIMEOUT': '支付超时关闭',
      'CLOSED_CANCELED': '已取消',
      'PAID_CONFIRM_PENDING': '已支付',
      'CONFIRMED_DELIVER_PENDING': '待发货',
      'CONFIRMED_PICK_PENDING': '待取货',
      'DELIVERING': '发货中',
      'DELIVERED_CONFIRM_PENDING': '已发货',
      'CANCELED_RETURN_PENDING': '待退货',
      'CLOSED_CONFIRMED': '已确认收货',
      'CANCELED_REFUND_PENDING': '待退款',
      'CLOSED_REFUNDED': '已退款',
    };
    const listProps = {
      namespace,
      location,
      dispatch,
      modelStatus,
      dataPool,
      requester,
      listProps: {
        title: false,
      },
      APIObject: {
        listAPI: null,
      },
      config: {
        table: {
            columns: [
                { title: '商品编号', field: 'barcode' },
                { title: '商品类型', field: 'type' },
                { title: '商品名称', field: 'product_name', width: 200, },
                { title: '图片', field: 'cover', valueType: 'image' },
                { title: '购买数量/件', field: 'quantity' },
                { title: '商品总额', field: 'price', valueType: 'currency' },
                { title: '实际支付', field: 'final_price', valueType: 'currency' },
            ],
        },
    }
    };
    const images = orderData.evaluations && orderData.evaluations[0] && orderData.evaluations[0].images || [];

    return (
      <TitleLayout title="商品评价详情">
        <h3>评价商品：{ orderData.evaluations && orderData.evaluations[0] && orderData.evaluations[0].product_name || '-' }</h3>
        <LRLayout>
          <LRLayout leftStyle={{width: '60px'}}>
            <ImageAdaptive data={{
              width: '60px',
              height: '60px',
              url: this.getAvatar(orderData),
            }} />
            <div style={{marginLeft: '1em'}}>{ this.getUserName(orderData) || '-' }</div>
          </LRLayout>
          <Rate value={ this.getRate(orderData) } disabled={ true } />
        </LRLayout>
        <br />
        { images.map( (item,i) => <ImageView key={ i } data={ item } /> ) }
        { images.length > 0 ? (
          <Fragment>
            <br /><br />
          </Fragment>
        ) : null }
        <TitledHeader title="评价列表" extra={ <Button type="primary" onClick={ this.changeModalStatus }>添加回复</Button> }>
        { orderData.evaluations && orderData.evaluations.map( item => {
          return <Fragment key={ item.id }>
            <LRLayout>
              <div>{ item.content || '-' }</div>
              <div style={{textAlign: 'right'}}>{ item.create_time || '-' }</div>
            </LRLayout>
            { item.replys && item.replys.map( i => {
              return <LRLayout key={ i.id }>
                <div style={{marginLeft: '2em'}}>商家回复：{ i.content || '-' }</div>
                <div style={{textAlign: 'right'}}>{ i.createTime || '-' }</div>
              </LRLayout>
            } ) }
          </Fragment>
        }) }
        </TitledHeader>
        <TitledHeader title="订单基本信息">
          <LRLayout>
            <div>订单编号：{ orderData.order_number } </div>
            <div>订单状态：{ statusMap[orderData.status] } </div>
          </LRLayout>
          <LRLayout>
            <div>下单时间：{ orderData.created_date } </div>
            <div>交易号：{ orderData.a || '-' } </div>
          </LRLayout>
          <LRLayout>
            <div>实际总金额：￥ { orderData.total_price } </div>
            <div>优惠金额：{ orderData.b || 'todo' } </div>
          </LRLayout>
          <LRLayout>
            <div>用户：{ orderData.contact_user || '-' } </div>
            <div>注册手机号：{ orderData.phone } </div>
          </LRLayout>
          <List { ...listProps } tableData={ orderData.order_items || [] } />
        </TitledHeader>
        <Modal { ...modalProps }>
          <TextArea onChange={ this.handleChange } value={ value } />
        </Modal>
      </TitleLayout>
    );
  }
}