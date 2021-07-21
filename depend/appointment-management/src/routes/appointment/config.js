module.exports = {
  header: {
    title: '预约管理'
  },
  operation: {
    action: [
      // { title: '导出Excel', action: 'export' },
    ]
  },
  search: {
    fields: [
      {
        field: 'search',
        label: '搜索关键字',
        props: {
          placeholder: '预约单号、会员账号、店铺接待人',
        },
        type: 'input',
      },
      {
        field: 'status', type: 'select',
        label: '状态',
        options: [
          { key: '全部', value: ' ' },
          { key: '待到店', value: 'WAIT_TO_STORE' },
          { key: '已到店', value: 'ALREADY_TO_STORE' },
          { key: '过期未处理', value: 'EXPIRED' },
          { key: '待付款', value: 'PAY_PENDING' },
          { key: '用户已取消', value: 'CANCELLED' },
          { key: '取消支付', value: 'PAY_TIMEOUT' },
          { key: '失约未到店', value: 'MISS_TO_STORE' },
        ]
      },
      {
        field: 'paymentMethod', type: 'select',
        label: '支付方式',
        options: [
          { key: '微信', value: 'WECHAT' },
          { key: '支付宝', value: 'ALIPAY' },
          { key: '现金', value: 'CASH' },
        ]
      },
      // { field: 'type', type: 'select',
      //   label: '预约类型',
      //   options: [
      //     { key: '皮肤测试', value: 'SKIN' },
      //     { key: 'DNA测试', value: 'DNA' },
      //   ]
      // },
      {
        field: 'type', type: 'field-config-select',
        label: '预约类型',
        API: '/api/appointment/items',
        options: { name: 'type', value: 'type' }
      },
      {
        field: 'itemName', type: 'field-config-select',
        label: '店铺',
        API: '/api/store/stores',
        options: { name: 'name', value: 'name' }
      },
      {
        field: 'appointmentTime',
        label: '预约时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
    ],
    columnNum: 3,
    simpleSearchCount: 3,
  },
  table: {
    scroll: {
      x: 1200,
    },
    columns: [
      { title: '预约码', field: 'code', width: 180 },
      {
        title: '预约类型', field: 'type', width: 160, render: (text = "") => {
          return text.replace('SKIN', '皮肤测试').replace('DNA', 'DNA测试');
        }
      },
      { title: '预约状态', field: 'status', valueType: 'statusTag' },
      {
        title: '预约时间', field: 'appointmentTime', width: 150, render: (text, records) => {
          const day = records.earliestTime.replace(/\S+$/, '');
          const startTime = records.earliestTime.replace(/^\S+/, '');
          const endTime = records.latestTime.replace(/^\S+/, '');
          return `${day} ${startTime} ~${endTime}`;
        }
      },
      {
        title: '支付方式', field: 'paymentMethod', width: 90,
        render: (text, records) => {
          if (text === '') {
            if (records.status !== 'PAY_PENDING') {
              return '免支付';
            }
            return '-';
          }
          return text;
        }
      },
      { title: '实付金额', field: 'fee', valueType: 'currency', width: 100 },
      { title: '预约店铺', field: 'itemName' },
      { title: '店铺接待人', field: 'receptionistName', width: 120 },
      { title: '会员账号', field: 'memberName', width: 120 },
    ],
    operation: [
      { title: '详情', action: 'query' },
    ]
  },
  form: {
    fields: [
      {
        field: '基本信息', label: '', type: 'group', span: 2,
      },
      { field: 'code', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'appointmentCode', type: 'plain', intlPrefix: 'appointment.' },
      {
        field: 'type', type: 'plain', intlPrefix: 'appointment.',
        options: {
          valueMap: {
            'SKIN': '皮肤测试',
            'DNA': 'DNA测试',
            'SKIN+DNA': '皮肤测试 + DNA测试',
          },
        }
      },
      {
        field: 'status', type: 'plain', intlPrefix: 'appointment.',
        options: {
          valueMap: {
            'WAIT_TO_STORE': '待到店',
            'ALREADY_TO_STORE': '已到店',
            'EXPIRED': '过期未处理',
            'PAY_PENDING': '待付款',
            'CANCELLED': '用户已取消',
            'PAY_TIMEOUT': '取消支付',
            'MISS_TO_STORE': '失约未到店',
          },
        }
      },
      { field: 'paymentCode', type: 'plain', intlPrefix: 'appointment.' },
      {
        field: 'paymentMethod', type: 'plain', intlPrefix: 'appointment.',
        // value: '免支付',
        options: {
          valueMap: {
            '': '免支付',
          },
        },
      },
      { field: 'paymentTime', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'fee', type: 'plain', intlPrefix: 'appointment.', value: '0' },
      { field: 'createTime', type: 'plain', intlPrefix: 'appointment.' },
      {
        field: '预约详情', label: '', type: 'group', span: 2,
      },
      { field: 'memberName', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'memberPhone', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'itemName', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'itemAddress', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'serverName', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'receptionistName', type: 'plain', intlPrefix: 'appointment.' },
      { field: 'description', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'appointmentTime', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'closeTime', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'serverId', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'itemId', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'itemIcon', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'memberId', type: 'plain', intlPrefix: 'appointment.' },
      // { field: 'receptionistId', type: 'plain', intlPrefix: 'appointment.' },
    ],
    colNumber: 2
  }
}