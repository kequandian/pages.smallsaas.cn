module.exports = {
  header: {
    title: '分销商管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.traders.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'traderName',
        placeholder: '分销商名',
        type: 'input',
      },
      {
        field: 'traderCode',
        placeholder: '分销商编号',
        type: 'input',
      }
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
        title: '分销商名', field: 'traderName',
        // width: 120, fixed: 'left'
      },
      {
        title: '分销商编号', field: 'traderCode', valueType: 'path',
        // width: 180, fixed: 'left',
        options: {
          path: '/traders',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '所在省市', field: 'traderPCD', valueType: 'PCD' },
      { title: '详细地址', field: 'traderAddress', width: 180 },
      { title: '邮政编码', field: 'traderPostcode' },
      { title: '联系人', field: 'traderContactName' },
      { title: '联系人电话', field: 'traderContactPhone' },
      { title: '状态', field: 'traderStatus', valueType: 'statusTag' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'wms.traders.edit',
          localtion: true,
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          permission: 'wms.traders.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'traderCode', type: 'serial-code', intlPrefix: 'traders.',
        props: { prefix: 'SEL' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'traderName', type: 'input', intlPrefix: 'traders.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'traderPCD', type: 'pcd-select', intlPrefix: 'traders.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'traderAddress', type: 'input', intlPrefix: 'traders.',
        rules: [
          { required: true }
        ]
      },
      { field: 'traderPostcode', type: 'input', intlPrefix: 'traders.' },
      {
        field: 'traderStatus', type: 'radio', intlPrefix: 'traders.',
        value: 'Normal',
        options: [
          {
            key: '启用',
            value: 'Normal',
          },
          {
            key: '禁用',
            value: 'Forbidden'
          }
        ]
      },
      { field: '个人信息', type: 'group', label: null, span: 2 },
      {
        field: 'traderContactName', type: 'input', intlPrefix: 'traders.',
        rules: [
          { required: true }
        ]
      },
      { field: 'traderContactPhone', type: 'phone', intlPrefix: 'traders.' },
      { field: 'traderContactEmail', type: 'email', intlPrefix: 'traders.' },
      { field: 'traderContactPosition', type: 'input', intlPrefix: 'traders.' },
      { field: 'traderContactCellPhone', type: 'mobile', intlPrefix: 'traders.' },
      { field: '财务信息', type: 'group', label: null, span: 2 },
      { field: 'traderAccountName', type: 'input', intlPrefix: 'traders.' },
      { field: 'traderAccountBank', type: 'input', intlPrefix: 'traders.' },
      { field: 'traderAccountBankNo', type: 'input', intlPrefix: 'traders.' },
      { field: 'traderInvoiceTitle', type: 'input', intlPrefix: 'traders.' },
      { field: '其它信息', type: 'group', label: null, span: 2 },
      { field: 'traderNote', type: 'input', intlPrefix: 'traders.' },
      { field: 'traderRegisterTime', type: 'datetime', intlPrefix: 'traders.' },
    ],
    colNumber: 2
  },
  details: {
    form: {
      fields: [
        {
          field: 'traderCode', type: 'plain', intlPrefix: 'traders.',
        },
        {
          field: 'traderName', type: 'plain', intlPrefix: 'traders.',
        },
        {
          field: 'traderPCD', type: 'plain', intlPrefix: 'traders.',
        },
        {
          field: 'traderAddress', type: 'plain', intlPrefix: 'traders.',
        },
        { field: 'traderPostcode', type: 'plain', intlPrefix: 'traders.' },
        {
          field: 'traderStatus', type: 'plain', intlPrefix: 'traders.',
          options: {
            valueMap: {
              'Normal': '启用',
              'Forbidden': '禁用',
            }
          },
        },
        { field: '个人信息', type: 'plain', label: null, span: 2 },
        {
          field: 'traderContactName', type: 'plain', intlPrefix: 'traders.',
        },
        { field: 'traderContactPhone', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderContactEmail', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderContactPosition', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderContactCellPhone', type: 'plain', intlPrefix: 'traders.' },
        { field: '财务信息', type: 'group', label: null, span: 2 },
        { field: 'traderAccountName', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderAccountBank', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderAccountBankNo', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderInvoiceTitle', type: 'plain', intlPrefix: 'traders.' },
        { field: '其它信息', type: 'group', label: null, span: 2 },
        { field: 'traderNote', type: 'plain', intlPrefix: 'traders.' },
        { field: 'traderRegisterTime', type: 'plain', intlPrefix: 'traders.' },
      ],
      colNumber: 2
    }
  }
}