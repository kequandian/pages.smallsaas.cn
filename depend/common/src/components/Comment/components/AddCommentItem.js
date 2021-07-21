import React, { Component } from 'react';
import { Avatar, Popconfirm } from 'antd';
import { LRLayout } from 'kqd-layout-flex';


export default class AddCommentItem extends Component {
  handleDeleteItem = () => {
    const { data, onDeleteItem } = this.props;
    if(onDeleteItem){
      onDeleteItem(data.id, data);
    }
  }
  render(){
    const { data = {} } = this.props;
    return <LRLayout span={[2,20]} leftOffset={ 2 } className="kc-comment-item" leftClassName="kc-comment-avatar">
      <Avatar size="large" src={ data.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' } />
      <LRLayout span={ [20,4] } rightClassName="kc-comment-action">
        <div>
            <div className="kc-comment-secondary-color">{ data.memberName } { data.createTime }</div>
            <div className="kc-comment-secondary-content">
              { data.content }
            </div>
        </div>
        <div>
          {/* <Button size="small" type="danger" onClick={ this.handleDeleteItem }>删除</Button> */}
          <Popconfirm title="确定要删除这条追加的评论吗？" okText="删除" cancelText="取消" onConfirm={ this.handleDeleteItem }>
            <a href="#">删除</a>
          </Popconfirm>
        </div>
      </LRLayout>
    </LRLayout>
  }
}