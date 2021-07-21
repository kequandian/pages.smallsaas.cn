import React, { Fragment, Component } from 'react';
import { LRLayout } from 'kqd-layout-flex';
import { Button, Pagination, message } from 'antd';
import DirectComment from './components/DirectComment';
import CommentItem from './components/CommentItem';
import './index.css';

export default class Comment extends Component {
  state = {
    directContent: '',
  }
  handleChange = (e) => {
    this.setState({
      directContent: e.target.value || '',
    });
  }
  handleDirect = () => {
    const { onComment } = this.props;
    const { directContent } = this.state;
    if(onComment){
      if( directContent.trim().length > 0 ){
        onComment(directContent);
        this.setState({
          directContent: '',
        });
      }else{
        message.warn('评论内容不能为空！');
      }
    }
  }
  render(){
    const { data = [], onChange, onShowSizeChange, pagination, ...restProps } = this.props;
    const { directContent } = this.state;

    return <Fragment>
      <DirectComment value={ directContent } onChange={ this.handleChange } />
      <LRLayout rightClassName="kc-comment-textRight">
        <Fragment></Fragment>
        <Button type="primary" onClick={ this.handleDirect }>添加评论</Button>
      </LRLayout>
      <br />
      { data.map( (item,i) => <CommentItem key={i} data={ item } { ...restProps } /> ) }
      <br />
      { data.length > 0 ? (
          <div className="kc-comment-textRight">
            <Pagination
              { ...pagination }
              onChange={ onChange }
              onShowSizeChange={ onShowSizeChange }
              showQuickJumper={true}
              showSizeChanger={true}
            />
          </div>
        ) : '暂无数据'}
    </Fragment>
  }
}