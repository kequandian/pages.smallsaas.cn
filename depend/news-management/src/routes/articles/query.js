import React, { Component } from 'react';
import { remove, create, query } from 'kqd-utils/lib/services';
import queryString from 'querystring';
import { LRLayout } from 'kqd-layout-flex';
import { EventProxy, GMApp } from 'kqd-general';
import { ImageAdaptive } from 'kqd-common';
import { Modal } from 'antd';
import CommentProxy from './component/CommentProxy';

import './style.css';
const confirm = Modal.confirm;
const TitleLayout = GMApp.TitleLayout;

export default class Query extends Component {

  componentDidMount() {
    const { requester } = this.props;
    requester.fetchOne({
      API: '/api/cms/articles/[id]',
    }, 'news');
  }

  renderHTML = (content) => {
    return { __html: content };
  }
  updateComment = () => {
    this.commentRef.props.onChange({ current: 1 });
  }
  handleDelete = (id, data) => {
    const { updateComment } = this;
    create(`/api/cms/evaluations/${id}/action/forbidden`)
      .then(() => {
        updateComment();
      });
  }
  handleDeleteItem = (id, data) => {
    const { updateComment } = this;
    create(`/api/cms/evaluations/${id}/action/forbidden`)
      .then(() => {
        updateComment();
      });
  }
  // 回复/追加 评论
  handleAdd = (id, data) => {
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?', ''));
    // /api/cms/evaluation/${id}/pub/addition
    create(`/api/cms/evaluations`, {
      content: data,
      stockId: id,
      stockType: 'Evaluation',
      originId: queryObj.id,
      originType: 'Article',
    })
      .then(_ => {
        this.updateComment();
      });
  }
  // 直接评论
  handleComment = (data) => {
    const { location } = this.props;
    const queryObj = queryString.parse(location.search.replace('?', ''));
    create('/api/cms/evaluations', {
      stockId: queryObj.id,
      stockType: 'Article',
      content: data,
    })
      .then(_ => {
        this.updateComment();
      });
  }

  render() {
    const { modelStatus } = this.props;
    const { commnetList = {} } = modelStatus;
    console.log('999999999 modelStatus = ', modelStatus.news);
    const productRelations = modelStatus.news && modelStatus.news.productRelations ? modelStatus.news.productRelations : []
    let cover = modelStatus.news.cover;
    try {
      cover = JSON.parse(cover);
    } catch (error) {
      cover = [];
    }
    cover.forEach((item, i) => {
      cover = {
        ...item,
        width: '80px',
        height: '80px',
      }
    });

    return (
      <TitleLayout title="资讯详情" {...this.props}>
        <h2 className="title">{modelStatus.news.title}</h2>
        <h3 className="title" style={{ fontSize: '1em' }}>{modelStatus.news.subTitle}</h3>
        <div className="info">
          <span style={{ marginRight: '1em' }}>{modelStatus.news.author}</span>
          {modelStatus.news.createdTime}
        </div>
        <div dangerouslySetInnerHTML={this.renderHTML(modelStatus.news.content)} />
        <LRLayout span={[4, 20]} align="top" rightClassName="textRight" style={{ margin: '1em 0' }}>
          <div>
            封面
            <ImageAdaptive
              data={cover}
            />
          </div>
          <div>
            <span style={{ marginRight: '1em' }}>评论数：{commnetList.total || 0}</span>
            <span style={{ marginRight: '1em' }}>点赞数：{modelStatus.news.likeCount || 0}</span>
            <span style={{ marginRight: '1em' }}>收藏数：{modelStatus.news.favoriteCount || 0}</span>
            <span style={{ marginRight: '1em' }}>浏览数：{modelStatus.news.visitCount || 0}</span>
          </div>
        </LRLayout>
        <br />
        <div style={{ margin: '1em 0 2em 0' }}>
          关联的产品
          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
            {
              productRelations.length > 0 && productRelations.map((item, index) => (
                <div className='product' key={index}>
                  <div className='productImage' style={{ backgroundImage: `url(${item.cover})` }}></div>
                  <span>{item.name || ''}</span>
                </div>
              ))
            }
          </div>

        </div>
        <div className="popups">
          <div className="label">
            评论列表
          </div>
        </div>
        <GMApp
          {...this.props}
          routerMap={{
            query: CommentProxy,
          }}
          dataSourceMap="commnetList"
        />
      </TitleLayout>
    );
  }
}
