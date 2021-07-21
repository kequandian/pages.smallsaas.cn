import React from 'react';
import { routerRedux } from 'dva/router';
import queryString from 'querystring';

export const walletConfig = {
  header: {
    title: '钱包配置文件'
  },
  operation: {},
  search: {
    fields: [
      {
        field: 'search',
        label: '交易单号',
        placeholder: '请输入内容……',
        type: 'input',
      },
      {
        field: 'created_date',
        label: '交易时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ]
  },
  table: {
    columns: [
      { title: '时间', field: 'created_time' },
      { title: '交易来源', field: 'type', valueType: 'statusTag' },
      { title: '相关单号', field: 'note' },
      { title: '交易金额', field: 'totalAmount', valueType: 'profitAndLoss' },
      { title: '钱包余额', field: 'totalBalance', valueType: 'currency' },
    ],
    operation: []
  },
  form: {},
}
export const IntegrationConfig = {
  header: {
    title: '积分配置文件'
  },
  operation: {},
  search: {
    fields: [
      // {
      //   field: 'search',
      //   label: '订单编号',
      //   placeholder: '请输入内容……',
      //   type: 'input',
      // },
      {
        field: 'changedDate',
        label: '记录时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ]
  },
  table: {
    columns: [
      { title: '时间', field: 'changedDate' },
      { title: '获取/扣除方式', field: 'origin' },
      { title: '相关单号', field: 'a' },
      { title: '获取/扣除积分', field: 'modifiedCredit', valueType: 'profitAndLoss' },
      { title: '剩余可用积分', field: 'changedCredit' },
    ],
    operation: []
  },
  form: {},
}
export const CouponConfig = {
  header: {
    title: '优惠券配置文件'
  },
  operation: {
    fields: [
      {
        field: 'status',
        label: '优惠券状态',
        type: 'select',
        value: 'ACTIVATION',
        options: [
          { key: '未使用', value: 'ACTIVATION' }, { key: '已使用', value: 'USED' }, { key: '已过期', value: 'OVERDUE' }
        ],
      },
    ],
    action: [
      {
        title: '发券', action: 'add', options: {
          routerType: 'couponForm',
          queryData: {
            toId: '{QueryId}',
          }
        }
      }
    ],
  },
  search: {},
  table: {
    columns: [
      { title: '券号', field: 'code' },
      { title: '优惠内容', field: 'name' },
      { title: '发券时间', field: 'created_date' },
      { title: '有效期', field: 'valid_date' },
      { title: '状态', field: 'status', valueType: 'status' },
      { title: '营销方案', field: 'type' },
    ],
    operation: []
  },
  form: {
    fields: [
      {
        field: 'couponTypeIds', type: 'tags-checkbox', intlPrefix: 'coupon.', span: 2,
        API: '/rest/admin/coupon_type',
        options: {
          name: 'name',
        },
      },
    ]
  },
}
export const CostlistConfig = {
  header: {
    title: '消费订单配置文件'
  },
  operation: {},
  search: {
    fields: [
      {
        field: 'search',
        label: '订单编号',
        placeholder: '请输入内容……',
        type: 'input',
      },
      {
        field: 'created_date',
        label: '交易时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ]
  },
  table: {
    columns: [
      {
        title: '订单编号', field: 'order_number',
        render: (text, record) => <a href={`store_order/detail/${record.id}`} target="_blank">{text}</a>
      },
      { title: '订单状态', field: 'status', valueType: 'status' },
      { title: '下单时间', field: 'created_date' },
      { title: '支付方式', field: 'payment_type', valueType: 'status' },
      { title: '实付金额', field: 'total_price', valueType: 'currency' },
      { title: '专属客服', field: 'store_guide_user_name' },
      { title: '结算店铺', field: 'store_name' },
      { title: '收银员', field: 'store_user_name' },
      // { title: '会员账号', field: 'contact_user'},
    ],
    operation: []
  },
  form: {},
}
export const SkinConfig = {
  header: {
    title: '皮肤测试配置文件'
  },
  operation: {},
  search: {
    fields: [
      {
        field: 'reportTime',
        label: '测试时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ]
  },
  table: {
    columns: [
      { title: '测试时间', field: 'reportTime' },
      // { title: '测试类型', field: 'b' },
      {
        title: '肤色类型', field: 'complexion', render: (text) => {
          const complexionMap = {
            '1': '黝黑',
            '2': '古铜',
            '3': '暗沉',
            '4': '小麦',
            '5': '自然',
            '6': '白皙',
            '7': '透白',
            '8': '绯红',
          }
          return complexionMap[text] || text;
        }
      },
      { title: '肌肤年龄', field: 'synAge' },
      { title: '测试总分', field: 'synScore' },
      {
        title: '操作', field: 'operation', render: (text, record) => {
          function push() {
            window.dispatch(routerRedux.push({
              pathname: `/report`,
              search: queryString.stringify({
                id: record.id
              }),
            }))
          }
          return <a href="javascript:;" onClick={push}>查看报告</a>
        }
      },
    ],
    operation: []
  },
  form: {},
}