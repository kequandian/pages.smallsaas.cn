import React,{ Fragment, Component } from 'react';
import { Button, Table, DatePicker } from 'antd';
import queryString from 'query-string';
import { LRLayout } from 'kqd-layout-flex';
import { ImageAdaptive } from 'kqd-common';
import { GMApp } from 'kqd-general';
import { routerRedux } from 'dva/router';
import './style.css';

const TitleLayout = GMApp.TitleLayout;
const List = GMApp.List;

export default class Query extends Component {
  componentDidMount(){
    const { requester } = this.props;
    requester.fetchOne({},'assistantData');
  }
  render() {
    const { dispatch, namespace, location: { search } } = this.props;
    let { modelStatus: { assistantData = {} } } = this.props;
    const { dataPool, ...restProps } = this.props;
    const id = queryString.parse(search).id;
    console.log(this.props);

    const clientConfig = {
      table: {
        columns: [
          { title: '会员姓名', field: 'vipName' },
          { title: '会员账号', field: 'vipNo' },
          { title: '绑定时间', field: 'date'  },
        ]
      },
    }
    function getAvatar(data){
      let url;
      try {
        url = JSON.parse(data)[0].url;
      } catch (error) {
        
      }
      return url;
    }

    return (
      <TitleLayout title="店员详情" { ...this.props }>
        <LRLayout>
          <LRLayout
            span={[ 6, 18 ]}
            >
                <div className="assistants-avatarBox">
                  <ImageAdaptive data={ { url: getAvatar(assistantData.avatar) } } />
                </div>
                <Fragment>
                  <div className="assistants-staffstoreInfoBar">
                    <span>姓名：</span>
                    <span>{ assistantData.name }</span>
                    <span>{ assistantData.isShopkeeper === 1 ? '店长' : '店员' }</span>
                  </div>
                  <div className="assistants-staffstoreInfoBar">
                    <span>登陆账号：</span>
                    <span>{ assistantData.username }</span>
                  </div>
                </Fragment>
          </LRLayout>
          <LRLayout
            style={ {padding: '0 2em 0 0'} }>
                <Fragment>
                    <div className="assistants-staffstoreInfoBar">
                      <span>联系电话：</span>
                      <span>{ assistantData.telephone }</span>
                    </div>
                    <div className="assistants-staffstoreInfoBar">
                      <span>微信：</span>
                      <span>{ assistantData.wechat }</span>
                    </div>
                </Fragment>
                {/* <div className="assistants-editButton">
                  <Button icon="edit" shape="circle" onClick={ _ => 
                    dispatch(routerRedux.push({pathname: namespace, search: `?type=edit&id=${id}` }))
                  }>
                  </Button>
                </div> */}
          </LRLayout>
        </LRLayout>
        <br />
        <LRLayout>
          <List
            { ...restProps }
            dataSourceMap="assistantList"
            visible={ assistantData.code !== undefined }
            config={ clientConfig }
            listProps={{
              title: 'TA 的客户',
            }}
            APIObject={{ listAPI: `/api/vip/accounts?bindingAssistantCode=${ assistantData.code }&bindingAssistantName=${ assistantData.name }` }}
          />
        </LRLayout>
      </TitleLayout>
    );
  }
}