import React, { Fragment, Component } from 'react';
import classnames from 'classnames';
import { LRLayout } from 'kqd-layout-flex';
import { Avatar, Input, Divider, Button, message, Popconfirm } from 'antd';

import AddCommentItem from './AddCommentItem';

const { TextArea } = Input;

export default class CommentItem extends Component {
  state = {
    edit: false,
  };
  content = "";
  handleDelete = () => {
    const { data, onDelete } = this.props;
    if(onDelete){
      onDelete(data.id, data);
    }
  }
  handleChange = (e) => {
    this.content = e.target.value;
  }
  handleAdd = () => {
    const { data, onAdd } = this.props;
    this.setState({ edit: false })
    if(onAdd){
      if(this.content.trim().length > 0){
        onAdd(data.id, this.content);
        this.content = "";
      }else{
        message.warn('回复内容不能为空！');
      }
    }
  }
  flatMap = (array,item) => {
    if( item.replys instanceof Array && item.replys.length > 0 ){
      this.flatMap(array,item.replys[0]);
    }
    array.unshift(item);
  }
  render(){
    const { edit } = this.state;
    const { data = {}, onDeleteItem } = this.props;

    const containerClassName = classnames({
      'kc-comment-item': true,
      'active': edit,
    });
    return <Fragment>
      <LRLayout span={[2,22]} className={ containerClassName } leftClassName="kc-comment-avatar">
        <Avatar size="large" src={ data.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' } />
        <LRLayout span={ edit? [24,0] : [20,4] } rightClassName="kc-comment-action">
          <div>
            <div className="kc-comment-secondary-color">{ data.memberName } { data.createTime }</div>
            <div className="kc-comment-secondary-content">
              { data.content }
            </div>
          </div>
          <div>
            { true ? ( // data.isDeleteAllow === 1
              <Fragment>
                <Popconfirm title="确定要删除这条评论吗？" okText="删除" cancelText="取消" onConfirm={ this.handleDelete }>
                  <a href="#">删除</a>
                </Popconfirm>
                {/* <Button size="small" type="danger" onClick={ this.handleDelete }>删除</Button> */}
                <Divider type="vertical" />
              </Fragment>
            ) : '' }
            <Button size="small" type="primary" onClick={ _=> this.setState({ edit: true }) }>回复</Button>
          </div>
        </LRLayout>
      </LRLayout>
        { data.replys && data.replys.map( (item) => {
          const list = [];
          this.flatMap(list,item);
          return list.map( reply => (<AddCommentItem key={reply.id} data={ reply } onDeleteItem={ onDeleteItem } />) );
        } ) }
        { edit ? 
          (
            <Fragment>
              <TextArea rows={ 2 } placeholder="请输入回复……" onChange={ this.handleChange } />
              <br /><br />
              <LRLayout rightClassName="kc-comment-textRight">
                <Fragment></Fragment>
                <div>
                  <Button size="small" onClick={ _=> this.setState({ edit: false }) }>取消</Button>
                  <Button size="small" type="primary" onClick={ this.handleAdd }>回复</Button>
                </div>
              </LRLayout>
            </Fragment>
          )
        : '' }
    </Fragment>
  }
}