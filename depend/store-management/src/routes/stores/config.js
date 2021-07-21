import React from 'react';
import concatAddress from '../utils/concatAddress';
import QRCodeView from '../../components/QRCodeView';

export default {
  header: {
    title: '店铺管理'
  },
  operation: {
    action: [
      { title: '添加店铺', action: 'add' },
    ],
    fields: [
      {
        field: 'search',
        placeholder: '店铺编号/店铺名',
        type: 'input',
      },
      {
        field: 'createTime',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ]
  },
  search: {
  },
  table: {
    scroll: {
      x: 1200,
    },
    columns: [
      {
        title: '店铺编号', field: 'code',
        width: 100,
        fixed: 'left', sorter: (a, b) => a.code - b.code
      },
      { title: '店铺名', field: 'name', width: 200, fixed: 'left' },
      { title: '创建时间', field: 'createTime', width: 120, sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime), },
      {
        title: '类型', field: 'type', width: 80,
        render: (text) => <div>{text === 'Store' ? '店铺' : '小屋'}</div>
      },
      {
        title: '状态', field: 'status',
        width: 96,
        valueType: 'statusTag'
      },
      {
        title: '店铺地址', field: 'storeAddress',
        // width: 300,
        render: (text, record) => <div>{concatAddress(record)}</div>
      },
      // { title: '店铺负责人', field: 'director'},
      { title: '店铺联系电话', field: 'telephone', width: 110, },
      { title: '店铺规模', field: 'assistantCount', width: 90 },
      { title: '店铺仓库', field: 'warehouseName', width: 120 },
      {
        title: '店铺QR', field: 'QRCode', width: 80, render: (text, records) => {
          const prefixMap = {
            'Store': 'store_code',
            'Muaskin': 'cabin_code',
          };
          return <QRCodeView data={{ code: records.code, prefix: prefixMap[records.type] }} />;
        }
      },
    ],
    operation: [
      {
        title: '正在营业', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: '(REST)|(CLOSED)',
          title: '您确定要修改改店铺为 正在营业 吗？',
          API: '/api/store/stores/(id)/action/business',
        }
      },
      {
        title: '店铺休息', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: 'BUSINESS',
          title: '您确定要修改改店铺为 休息 吗？',
          API: '/api/store/stores/(id)/action/rest',
        }
      },
      {
        title: '关闭店铺', action: 'confirm',
        options: {
          expectedField: 'status',
          expectedValue: 'BUSINESS',
          title: '您确定要修改改店铺为 关闭 吗？',
          API: '/api/store/stores/(id)/action/closed',
        }
      },
      { title: '详情', action: 'query' },
      { title: '编辑', action: 'edit' },
      { title: '删除', action: 'delete' },
    ]
  },
  form: {
    fields: [
      {
        field: 'code', type: 'input', intlPrefix: 'stores.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'name', type: 'input', intlPrefix: 'stores.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'warehouseId', type: 'field-config-select', intlPrefix: 'stores.',
        API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'id' },
        value: '1',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'pcd', type: 'pcdgeo-select', intlPrefix: 'stores.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'address', type: 'input', intlPrefix: 'stores.', span: 2,
        rules: [
          { required: true }
        ]
      },
      { field: 'longitude', type: 'transparent-input', intlPrefix: 'stores.' },
      { field: 'latitude', type: 'transparent-input', intlPrefix: 'stores.' },
      {
        field: 'type', type: 'radio', intlPrefix: 'stores.', span: 2,
        value: 'Store',
        options: [
          {
            key: '店铺',
            value: 'Store'
          },
          {
            key: '小屋',
            value: 'Muaskin'
          }
        ]
      },
      // {
      //   field: 'director',
      //   type: 'field-config-select',
      //   intlPrefix: 'stores.',
      //   API: '/rest/user',
      //   options: { name: 'name', value: 'id' },
      //   rules: [
      //     { required: true }
      //   ]
      // },
      { field: 'telephone', type: 'input', intlPrefix: 'stores.' },
      // { field: 'createTime', type: 'datetime', intlPrefix: 'stores.' },
      {
        field: 'images', type: 'avatar-upload', intlPrefix: 'stores.', span: 2, props: { maxNumber: 6 },
        rules: [
          { required: true }
        ]
      },
      { field: 'introduce', type: 'rich-text', intlPrefix: 'stores.', span: 2 },
    ],
    colNumber: 2
  },
  details: {
    operation: {
      action: [
        {
          title: '添加店员', action: 'add',
          options: {
            routerType: 'addStaff',
            queryData: {
              id: '{QueryId}'
            },
          }
        },
      ]
    },
    search: {},
    form: {
      fields: [
        {
          field: 'userId',
          type: 'field-config-select',
          API: '/rest/staff',
          intlPrefix: 'stores.',
          options: { name: 'name', value: 'id', saveToForm: ['name'] },
          rules: [
            { required: true }
          ]
        },
        {
          field: 'code', type: 'input', intlPrefix: 'assistants.',
          rules: [
            { required: true }
          ]
        },
        {
          field: 'position', type: 'select', intlPrefix: 'stores.',
          value: 0,
          options: [
            { key: '店长', value: 1 }, { key: '店员', value: 0 },
          ],
          rules: [
            { required: true }
          ]
        },
        // { field: 'position', type: 'role-select', intlPrefix: 'stores.',
        //   rules: [
        //     { required: true }
        //   ]
        // },
        // { field: 'storeId', type: 'plain', intlPrefix: 'stores.' },
      ],
      colNumber: 2
    },
    table: {
      API: '/api/store/assistants',
      queryMap: [
        { from: 'id', to: 'storeId' }
      ],
      columns: [
        { title: '姓名', field: 'name' },
        { title: '员工工号', field: 'code' },
        { title: 'qq', field: 'qq' },
        {
          title: '角色', field: 'position',
          render: (text) => {
            const map = {
              '1': '店长',
              '0': '店员',
            };
            return map[text] || text;
          }
        },
        {
          title: '员工QR', field: 'QRCode', render: (text, records) => {
            return <QRCodeView data={{ code: records.code, prefix: 'assistant_code' }} />;
          }
        },
      ],
      operation: [
        // { title: '指派店长', action: 'confirm',
        //   options: {
        //     type: 'conditionButton',
        //     color: 'dashed',
        //     expectedField: 'isDirector',
        //     expectedValue: '',
        //     title: '确定要将该用户作为 店长 吗？',
        //     API: '/api/store/{QueryId}/assistants/{ID}/action/shopkeeper',
        //   }
        // },
        // { title: '撤销店长', action: 'confirm',
        //   options: {
        //     type: 'conditionButton',
        //     color: 'danger',
        //     expectedField: 'isDirector',
        //     expectedValue: '1',
        //     title: '确定要撤销这个店员的 店长职位 吗？',
        //     API: '/api/store/{QueryId}/assistants/{ID}/action/shopkeeper',
        //   }
        // },
        { title: '详情', action: 'query', options: { path: '/assistants' } },
        // { title: '编辑', action: 'edit', options: { path: 'assistants' } },
        {
          title: '移除', action: 'delete',
          options: {
            title: '确定要从店铺内移除该员工吗？',
          },
        },
      ]
    }
  }
}
