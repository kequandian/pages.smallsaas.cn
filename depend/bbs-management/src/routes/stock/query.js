import React,{ Fragment, Component } from 'react';
import { remove } from 'kqd-utils/lib/services';
import queryString from 'querystring';
import { LRLayout, FlexLayout } from 'kqd-layout-flex';
// import { TitledHeader } from 'kqd-page-header';
import { GMApp } from 'kqd-general';
import { ImageView, ImageAdaptive } from 'kqd-common';
import { ListItem } from 'kqd-list-item-element';
import { Button, Modal, message } from 'antd';

import CommentProxy from './component/CommentProxy';

const confirm = Modal.confirm;
const { TitleLayout } = GMApp;
const { FlexItem } = FlexLayout;

import './style.css';

export default class Quert extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      // API: '/api/cms/articles/[id]',
      API: '/api/gw/expore/diaryDetail/[id]',
    },'news');
  }
  handleDeleteDiary = () => {
    const { router, location, modelStatus: { listAction } } = this.props;
    const queryObj = queryString.parse(location.search.replace('?',''));
    confirm({
      title: '确定要删除这篇日志吗？',
      content: '该操作不可恢复。',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove(`/api/cms/articles/${queryObj.id}`)
        .then( ({ code, message: rstMsg }) => {
          if( code === 200 ){
            message.success('删除成功');
            router.goBack();
            listAction.refreshList('/api/cms/diarys');
          }else{
            message.error(rstMsg);
          }
        });
      },
      onCancel() {},
    });
  }
  auditPass = () => {
    const { requester } = this.props;
    requester.createForm({
      API: '/api/cms/articles/[id]/action/publish',
      requestConfig: {
        callback: () => {
          requester.fetchOne({
            API: '/api/gw/expore/diaryDetail/[id]',
          },'news');
        }
      },
    });
  }
  auditReject = () => {
    const { requester } = this.props;
    requester.createForm({
      API: '/api/cms/articles/[id]/action/rejected',
      requestConfig: {
        callback: () => {
          requester.fetchOne({
            API: '/api/gw/expore/diaryDetail/[id]',
          },'news');
        }
      },
    });
  }
  renderHTML = (content) => {
    return {__html: content};
  }

  renderTags = () => {
    const { modelStatus } = this.props;
    const { news = {} } = modelStatus;
    const { tagList = [] } = news;
    return tagList.length === 0 ? '暂无' : tagList.map( (item,i) => <span style={{marginRight: '0.5em'}}>{`# ${item.tagName} #`}</span> );
  }

  render(){
    const { modelStatus } = this.props;
    const { news = {}, commnetList = {} } = modelStatus;
    const statusMap = {
      'Draft': '草稿',
      'PublishArticle': '发布',
      'Forbidden': '禁用',
      'Expired': '已过期',
      'Deprecated': '已下架',
      'Wait_Audit': '待审核',
      'Audit_Rejected': '审核拒绝',
    };

    return (
      <TitleLayout title="日志详情" { ...this.props } >
        <FlexLayout>
          <FlexItem style={{width: '300px'}}>
            <LRLayout span={[8,16]}>
              <div className="stock-avatatBox">
                <ImageAdaptive data={{
                  url: news.avatar,
                  width: '60px',
                  height: '60px',
                }} />
              </div>
              <div>
                <div className="stock-userName">{ news.name }</div>
                <div>{ news.subtitle }</div>
              </div>
            </LRLayout>
          </FlexItem>
          <FlexItem flex={ 1 } className="textRight">
            <span style={{marginRight: '8px'}}>当前状态：{ statusMap[news.status] || '审核拒绝' }</span>
            <Button type="danger" onClick={ this.handleDeleteDiary }>删除</Button>
            { news.status === 'Wait_Audit' ? 
              (
                <Fragment>
                  <Button onClick={ this.auditReject }>审核拒绝</Button>
                  <Button type="primary" onClick={ this.auditPass }>审核通过</Button>
                </Fragment>
              )
            : null }
            { news.status === 'Audit_Rejected' ? 
              (
                <Fragment>
                  <Button type="primary" onClick={ this.auditPass }>审核通过</Button>
                </Fragment>
              )
            : null }
          </FlexItem>
        </FlexLayout>
        <br />
        <div dangerouslySetInnerHTML={ this.renderHTML(news.content ? news.content : '') } />
        <br />
        <div className="label">
          相关配图
        </div>
        <ListItem data={ news && news.imageCarouselList || [] }>
          <ImageView />
        </ListItem>
        { news && news.imageCarouselList && news.imageCarouselList.length > 0 || ' 暂无数据' }
        <LRLayout span={[8,16]} align="top" rightClassName="textRight">
          <div>
            标签：<span style={{color: '#40a9ff'}}>{ this.renderTags() }</span>
          </div>
          <div>
            <span style={{marginRight:'1em'}}>评论数：{ commnetList.total || 0 }</span>
            <span style={{marginRight:'1em'}}>点赞数：{ news.likeNumber || 0 }</span>
            <span style={{marginRight:'1em'}}>收藏数：{ news.favoriteCount || 0}</span>
            <span style={{marginRight:'1em'}}>浏览数：{ news.visitCount || 0}</span>
          </div>
        </LRLayout>
        <br />
        <div className="popups">
          <div className="label">
            评论列表
          </div>
        </div>
        <GMApp
          { ...this.props }
          routerMap={{
            query: CommentProxy,
          }}
          dataSourceMap="commnetList"
        />
      </TitleLayout>
    );
  }
}
