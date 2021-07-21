module.exports = {
  header: {
    title: '供应商管理'
  },
  operation: {
    action: [
      {
        title: '添加', action: 'add',
        options: {
          permission: 'wms.supplier.add',
          localtion: true,
        }
      },
    ],
    fields: [
      {
        field: 'supplierName',
        placeholder: '供应商名',
        type: 'input',
      },
      {
        field: 'supplierCode',
        placeholder: '供应商编号',
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
        title: '供应商名', field: 'supplierName',
        // width: 120,
        // fixed: 'left'
      },
      {
        title: '供应商编号', field: 'supplierCode', valueType: 'path',
        // width: 180,
        // fixed: 'left',
        options: {
          path: '/suppliers',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      { title: '所在省市', field: 'supplierPCD', valueType: 'PCD' },
      { title: '详细地址', field: 'supplierAddress', width: 180 },
      { title: '邮政编码', field: 'supplierPostcode' },
      { title: '联系人', field: 'supplierContactName' },
      { title: '联系人电话', field: 'supplierContactPhone' },
      { title: '状态', field: 'supplierStatus', valueType: 'statusTag' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'wms.supplier.edit',
          localtion: true,
        }
      },
      {
        title: '删除', action: 'delete',
        options: {
          permission: 'wms.supplier.delete',
          localtion: true,
        }
      },
    ]
  },
  form: {
    fields: [
      {
        field: 'supplierCode', type: 'serial-code', intlPrefix: 'suppliers.',
        props: { prefix: 'SUP' },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'supplierName', type: 'input', intlPrefix: 'suppliers.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'supplierPCD', type: 'pcd-select', intlPrefix: 'suppliers.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'supplierAddress', type: 'input', intlPrefix: 'suppliers.',
        rules: [
          { required: true }
        ]
      },
      { field: 'supplierPostcode', type: 'input', intlPrefix: 'suppliers.' },
      {
        field: 'supplierStatus', type: 'radio', intlPrefix: 'suppliers.',
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
        field: 'supplierContactName', type: 'input', intlPrefix: 'suppliers.',
        rules: [
          { required: true }
        ]
      },
      { field: 'supplierContactPhone', type: 'phone', intlPrefix: 'suppliers.' },
      { field: 'supplierContactEmail', type: 'email', intlPrefix: 'suppliers.' },
      { field: 'supplierContactPosition', type: 'input', intlPrefix: 'suppliers.' },
      { field: 'supplierContactCellPhone', type: 'mobile', intlPrefix: 'suppliers.' },
      { field: '财务信息', type: 'group', label: null, span: 2 },
      { field: 'supplierAccountName', type: 'input', intlPrefix: 'suppliers.' },
      { field: 'supplierAccountBank', type: 'input', intlPrefix: 'suppliers.' },
      { field: 'supplierAccountBankNo', type: 'input', intlPrefix: 'suppliers.' },
      { field: 'supplierInvoiceTitle', type: 'input', intlPrefix: 'suppliers.' },
      { field: '其它信息', type: 'group', label: null, span: 2 },
      { field: 'supplierNote', type: 'input', intlPrefix: 'suppliers.' },
      { field: 'supplierRegisterTime', type: 'datetime', intlPrefix: 'suppliers.' },
    ],
    colNumber: 2
  },
  details: {
    form: {
      fields: [
        {
          field: 'supplierCode', type: 'plain', intlPrefix: 'suppliers.',
        },
        {
          field: 'supplierName', type: 'plain', intlPrefix: 'suppliers.',
        },
        {
          field: 'supplierPCD', type: 'plain', intlPrefix: 'suppliers.',
        },
        {
          field: 'supplierAddress', type: 'plain', intlPrefix: 'suppliers.',
        },
        { field: 'supplierPostcode', type: 'plain', intlPrefix: 'suppliers.' },
        {
          field: 'supplierStatus', type: 'plain', intlPrefix: 'suppliers.',
          options: {
            valueMap: {
              'Normal': '启用',
              'Forbidden': '禁用',
            }
          },
        },
        { field: '个人信息', type: 'group', label: null, span: 2 },
        {
          field: 'supplierContactName', type: 'plain', intlPrefix: 'suppliers.',
        },
        { field: 'supplierContactPhone', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierContactEmail', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierContactPosition', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierContactCellPhone', type: 'plain', intlPrefix: 'suppliers.' },
        { field: '财务信息', type: 'group', label: null, span: 2 },
        { field: 'supplierAccountName', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierAccountBank', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierAccountBankNo', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierInvoiceTitle', type: 'plain', intlPrefix: 'suppliers.' },
        { field: '其它信息', type: 'group', label: null, span: 2 },
        { field: 'supplierNote', type: 'plain', intlPrefix: 'suppliers.' },
        { field: 'supplierRegisterTime', type: 'plain', intlPrefix: 'suppliers.' },
      ],
      colNumber: 2
    }
  }
}