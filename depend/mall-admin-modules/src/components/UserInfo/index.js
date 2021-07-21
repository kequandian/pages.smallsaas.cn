import React, { Component, Fragment } from 'react';
import { LRLayout } from 'kqd-layout-flex';
import { Tag, Button, Switch, Modal } from 'antd';
import { ImageAdaptive } from 'kqd-common';
import CheckTag from './component/CheckTag';

import './style.css';

export default class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      tags: [],
      checkedTag: [],
      inputValue: '',
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    const { data = {} } = nextProps;
    this.setState({
      checkedTag: data.tags || [],
    });
  }
  changeEditState = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }
  handleTagChange = (checked, data) => {
    const { checkedTag } = this.state;
    let [ ...checkedTagCache ] = checkedTag;
    if(checked){
      checkedTagCache.push(data);
    }else{
      checkedTagCache = checkedTagCache.filter( tag => tag.id !== data.id );
    }
    this.setState({
      checkedTag: checkedTagCache,
    });
  }
  handleSaveTags = () => {
    const { dispatch, data } = this.props;
    dispatch({
      type: 'recommends/setTags',
      payload: {
        id: data.id,
        account: data.account,
        tags: this.state.checkedTag,
      }
    });
    this.setState({
      edit: false,
    });
    // tags: this.state.checkedTag,
  }
  switchStatus = (checked) => {
    const { requester } = this.props;
    requester.updateForm({
      API: '/api/vip/accounts/[id]',
      invalid: checked ? 0 : 1,
      requestConfig: {
        callback: () => {
          requester.fetchOne({},'userData')
        }
      },
    });
  }

  render() {
    const { data = {}, tagsData = [] } = this.props;
    const { edit, checkedTag } = this.state;
    const { tags = [] } = data;

    return(
      <Fragment>
        <div className='vip-center-userStatus'>
          <div className='vip-center-avatarBox'>
            <ImageAdaptive 
              data={{
                url: data.avatar,
                alt: 'avatar',
              }}
            />
          </div>
          <div>
            <h3>{ data.vipName }</h3>
            <LRLayout style={{width: '160px'}}>
              <div>账户状态：</div>
              <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={ data.invalid === 0 ? true : false } onChange={ this.switchStatus } />
            </LRLayout>
          </div>
        </div>
        <LRLayout span={[20,4]} className="vip-center-tabsBox" rightClassName="vip-center-TextRight">
          <div>
            <span>标签：</span>
            { tags.length > 0 ? tags.map((tag, i) => {
              return <Tag key={i}>{ tag.tagName }</Tag>
            }) : '暂无数据'}
          </div>
          <Button icon="edit" onClick={ this.changeEditState }>编辑标签</Button>
        </LRLayout>
        <Modal
          title="编辑会员标签"
          visible={ edit }
          onCancel={ this.changeEditState }
          onOk={ this.handleSaveTags }
        >
          { tagsData.map( (tag,i) => {
            const find = checkedTag.find( item => item.id === tag.id );
            return <CheckTag data={ tag } checked={ Boolean(find) } key={ i } onChange={ this.handleTagChange } />;
          } ) }
        </Modal>
      </Fragment>
    );
  }
}