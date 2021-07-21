import React, { PureComponent, Fragment } from 'react';
import { TitledHeader } from 'kqd-page-header';
import { Button } from 'antd';

export default class Query extends PureComponent {

  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({
      API: '/api/cms/notice/notices/[id]',
    },'news');
  }

  renderHTML = (text) => {
    return {__html: text};
  }

  render() {

    const { modelStatus } = this.props;
    const news = modelStatus.news || {}

    const style = {
      width: '50%',
      padding: '2em'
    }

    const contentStyle = {
      padding: '2em',
      display: 'flex'
    }

    return (
      <TitledHeader title="通知详情" extra={<Button onClick={ () => this.props.router.goBack() }>返回</Button>}>
          <div style={{display: 'flex',flexWrap:'wrap'}}>
            <div style={style}>标题：{ news.title }</div>
            <div style={style}>作者：{ news.author }</div>
            <div style={style}>通知人员：{ news.type == 'External' ? 'C端用户' : news.type == 'Internal' ? '门店员工' : 'C端用户及门店' }</div>
            <div style={style}>排序号： { news.orderNum }</div>
            <div style={style}>创建时间： { news.createTime }</div>
            <div style={style}>发布时间： { news.updateTime || '-' }</div>
            <div style={contentStyle}>
             <span>内容：</span>
             <div dangerouslySetInnerHTML={ this.renderHTML(news.content) }></div>
            </div>
          </div>
      </TitledHeader>
    );
  }
}
