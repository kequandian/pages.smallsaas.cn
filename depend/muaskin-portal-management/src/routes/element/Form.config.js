module.exports = {
  "fields": [
    {
      "field": "name",
      "label": "名称",
      "type": "input",
      rules: [
        { required: true, message: '该项是必填的' }
      ],
    },
    {
      field: "cover",
      label: "封面",
      type: "upload-image",
      options: {
        max: 1,
        API: '/api/upload/files',
      }
    },
    {
      "field": "seq",
      "label": "排序",
      "type": "number"
    },
    {
      field: 'note',
      label: '备注',
      type: 'textArea',
      span: 24,
    }
  ]
}