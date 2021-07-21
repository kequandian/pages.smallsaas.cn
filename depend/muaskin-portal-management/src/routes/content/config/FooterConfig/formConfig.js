export default {
  fields: [
    {
      field: 'content', label: '网站页脚内容', type: 'rich-text',
      rules: [
        { required: true, message: '该项是必填的' }
      ],
    },
  ],
}