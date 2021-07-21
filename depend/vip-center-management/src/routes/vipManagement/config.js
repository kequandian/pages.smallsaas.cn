module.exports = {
  header: {
    title: '默认配置文件'
  },
  operation: {
    action: [
      // { title: '设置', action: 'router', options: { icon: 'setting', path: '/vipManagement', queryData: { type: 'setting' } } },
      // { title: '添加', action: 'add' },
    ],
  },
  search: {
    fields: [
      {
        field: 'followedStoreCode',
        label: '绑定门店',
        type: 'field-config-select',
        API: '/api/store/stores',
        options: { name: 'name', value: 'code' }
      },
      {
        field: 'search',
        label: '搜索会员',
        props: {
          placeholder: '会员姓名/会员编号',
        },
        type: 'input',
      },
      {
        label: '邀请人', field: 'inviter', type: 'input',
        props: {
          placeholder: '邀请人姓名/邀请人编号',
        },
      },
      {
        field: 'registerDate',
        label: '入会时间',
        placeholder: ['开始时间', '结束时间'],
        type: 'range',
      },
      {
        field: 'isFollowedWechat',
        label: '关注公众号',
        type: 'select',
        value: ' ',
        options: [
          { key: '全部', value: ' ' }, { key: '已关注', value: '1' }, { key: '未关注', value: '0' }
        ],
      },
      {
        field: 'isFollowedStore',
        label: '关注店铺',
        type: 'select',
        value: ' ',
        options: [
          { key: '不限', value: ' ' }, { key: '已关注', value: '1' }, { key: '未关注', value: '0' }
        ],
      },
      {
        field: 'grade',
        label: '会员等级',
        type: 'field-config-select',
        API: '/api/vip/account/grades',
        options: { name: 'name', value: 'name' }
      },
      {
        field: 'inviterAccount',
        label: '会员账号',
        type: 'input',
      },
    ],
    simpleSearchCount: 4,
    columnNum: 4,
  },
  table: {
    columns: [
      {
        title: '会员编号', field: 'vipNo',
        // fixed: 'left',
        width: 120,
        valueType: 'path',
        options: {
          path: '/vipManagement',
          queryData: {
            type: 'query',
            id: '{id}',
          }
        }
      },
      {
        title: '姓名', field: 'realName',
        // fixed: 'left',
        width: 120
      },
      { title: '会员名', field: 'vipName', width: 120 },
      // { title: '微信昵称', field: 'wechatName'},
      { title: '绑定门店', field: 'followedStoreName' },
      { title: '会员等级', field: 'grade', align: 'center' },
      { title: '入会时间', field: 'registerDate' },
      { title: '注册手机号', field: 'registerMobile', align: 'right' },
      { title: '当前积分', field: 'credit', align: 'right' },
      {
        title: '是否已关注公众号', field: 'isFollowedWechat', align: 'center',
        render: (text) => {
          const followMap = {
            '0': '未关注',
            '1': '已关注',
          };
          return followMap[text] || text;
        }
      },
      { title: '邀请人编号', field: 'inviterNo' },
      { title: '邀请人', field: 'inviterName' },
      { title: '专属导购', field: 'bindingAssistantName' },
    ],
    operation: [
      {
        title: '编辑', action: 'edit',
        options: {
          permission: 'vip.manage.edit',
          localtion: true,
        }
      },
      { title: '详情', action: 'query' },
      // { title: '删除', action: 'delete' },
    ],
    scroll: {
      // x: 100,
    },
  },
  form: {
    fields: [
      {
        field: 'vipNo', type: 'plain', intlPrefix: 'vipManagement.',
        // rules: [
        //   { required: true }
        // ]
      },
      { field: 'registerMobile', type: 'plain', intlPrefix: 'vipManagement.' },
      { field: 'vipName', type: 'plain', intlPrefix: 'vipManagement.' },
      { field: 'realName', type: 'input', intlPrefix: 'vipManagement.' },
      { field: 'dob', type: 'date', intlPrefix: 'vipManagement.', span: 2 },
      { field: 'gradeName', type: 'plain', intlPrefix: 'vipManagement.' },
      {
        field: 'balance', type: 'plain', intlPrefix: 'vipManagement.',
        options: {
          valueMap: {
            '-': '0',
          }
        }
      },
      {
        field: 'credit', type: 'plain', intlPrefix: 'vipManagement.',
        options: {
          valueMap: {
            '-': '0',
          }
        }
      },
      {
        field: 'point', type: 'plain', intlPrefix: 'vipManagement.',
        options: {
          valueMap: {
            '-': '0',
          }
        }
      },
      // { field: 'account', type: 'plain', intlPrefix: 'vipManagement.' },
      { field: 'inviterNo', type: 'input', intlPrefix: 'vipManagement.' },
      { field: 'inviterName', type: 'plain', intlPrefix: 'vipManagement.' },
      // {
      //   field: 'inviterName', type: 'field-config-select', intlPrefix: 'vipManagement.'
      //   , API: '/api/wms/warehouses', options: { name: 'warehouseName', value: 'warehouseName' }
      // },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}