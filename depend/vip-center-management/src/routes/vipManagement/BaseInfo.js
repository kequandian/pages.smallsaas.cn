import React, { Component } from 'react';
import { Row, Col } from 'antd'

export default class BaseInfo extends Component {
  render() {
    const { data = {} } = this.props;
    const { dob = '-' } = data;
    const sexMap = {
      '0': '保密',
      '1': '男',
      '2': '女',
    };
    return (
      <div>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            会员来源：{data.source || '-'}
          </Col>
          <Col span={12}>
            会员名：{data.vipName || '-'}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            微信昵称：{data.wechatName || '-'}
          </Col>
          <Col span={12}>
            真实姓名：{data.realName || '-'}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            性别：{sexMap[data.sex]}
          </Col>
          <Col span={12}>
            会员编号：{data.vipNo || '-'}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            会员级别：{data.gradeName || '-'}
          </Col>
          <Col span={12}>
            生日：{dob.replace(/\s+\S+$/g, '')}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            当前成长值：{data.point === undefined ? '-' : data.point}
          </Col>
          <Col span={12}>
            当前积分：{data.credit || '-'}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            绑定门店：{data.followedStoreName || '-'}
          </Col>
          <Col span={12}>
            专属导购：{data.bindingAssistantName || '-'}
          </Col>
        </Row>
        <Row style={{ lineHeight: 4 }}>
          <Col span={12}>
            邀请人：{data.inviterName || '-'}
          </Col>
          <Col span={12}>
            绑定小屋：{data.bindingStoreName || '-'}
          </Col>
        </Row>
      </div>
    )
  }
}