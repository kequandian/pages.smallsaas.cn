import React, { Component } from 'react';
import { create } from 'kqd-utils/lib/services';
import queryString from 'querystring';
import { EventProxy } from 'kqd-general';
import { Comment } from 'kqd-common';

export default class CommentProxy extends Component{
  updateComment = (data) => {
    this.commentRef.props.onChange({ current: 1 });
  }
  handleDelete = (id,data) => {
    const { updateComment } = this;
    create(`/api/cms/evaluations/${id}/action/forbidden`)
    .then( () => {
      updateComment();
    });
  }
  handleDeleteItem = (id,data) => {
    const { updateComment } = this;
    create(`/api/cms/evaluations/${id}/action/forbidden`)
    .then( () => {
      updateComment();
    });
  }
  // 回复/追加 评论
  handleAdd = (id,data) => {
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?',''));
    // /api/cms/evaluation/${id}/pub/addition
    create(`/api/cms/evaluations`,{
      content: data,
      stockId: id,
      stockType: 'Evaluation',
      originId: queryObj.id,
      originType: 'Diary',
    })
    .then( _=> {
      this.updateComment();
    } );
  }
  // 直接评论
  handleComment = (data) => {
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?',''));
    create('/api/cms/evaluations',{
      stockId: queryObj.id,
      stockType: 'Diary',
      content: data,
    })
    .then( _=> { 
      this.updateComment();
     } );
  }

  render(){
    return <EventProxy { ...this.props }
      // tableAPI="/api/cms/evaluations?stockType=Diary&stockId=[id]"
      // tableAPI="/api/gw/expore/info/evaluations?stockType=Diary&stockId=[id]"
      tableAPI="/api/gw/expore/info/evaluations?stockType=Diary&stockId=[id]&isLayered=true"
    >
      <Comment eventType={ ['pagination'] }
        onDelete={ this.handleDelete }
        onDeleteItem={ this.handleDeleteItem }
        onAdd={ this.handleAdd }
        onComment={ this.handleComment }
        ref={ el => this.commentRef = el }
      />
    </EventProxy>
  }
}