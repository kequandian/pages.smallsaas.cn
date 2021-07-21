module.exports = {
  "fields": [
    {
      field: 'name',
      label: '名称',
      type: 'input',
    },
    {
      field: 'enabled',
      label: '启用',
      type: 'radio',
      value: 1,
      options: [
        { title: '是', value: 1 },
        { title: '否', value: 0 },
      ],
    },
    {
      field: "image",
      "label": "图片",
      "type": "upload-image",
      options: {
        max: 1,
        API: '/api/upload/files',
      }
    },
    {
      field: "targetUrl",
      "label": "跳转链接",
      "type": "textArea",
      options: {
        max: 255,
      }
    }
  ]
}