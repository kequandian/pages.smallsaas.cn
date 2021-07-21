module.exports = {
  header: {
    title: '应用下载设置'
  },
  form: {
    fields: [
      {
        field: 'iconUrl', type: 'avatar-upload', intlPrefix: 'apk.', span: 2,
        props: { maxNumber: 1 },
        rules: [
          { required: true }
        ],
      },
      {
        field: 'name', type: 'input', intlPrefix: 'apk.',
        rules: [
          { required: true }
        ]
      },
      // {
      //   field: 'downloads', type: 'number', intlPrefix: 'apk.',
      //   rules: [
      //     { required: true }
      //   ]
      // },
      {
        field: 'versionCode', type: 'input', intlPrefix: 'apk.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'downloadUrl', type: 'file-upload', intlPrefix: 'apk.', span: 2,
        // API: '/api/download/apk/upload',
        props: { maxNumber: 1 },
        rules: [
          { required: true }
        ]
      },
      {
        field: 'updateTime', type: 'datetime', intlPrefix: 'apk.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'level', type: 'radio', intlPrefix: 'apk.',
        options: [
          { key: '强制更新', value: 'MANDATORY' },
          { key: '用户自定', value: 'OPTIONAL' },
        ],
        rules: [
          { required: true }
        ]
      },
      {
        field: 'appleStoreLink', type: 'textarea', intlPrefix: 'apk.',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'description', type: 'rich-text', intlPrefix: 'apk.', span: 2,
        options: {
          delay: true,
        },
        rules: [
          { required: true }
        ]
      },
    ],
    colNumber: 2
  },
  details: {
    table: {},
    form: {},
  }
}