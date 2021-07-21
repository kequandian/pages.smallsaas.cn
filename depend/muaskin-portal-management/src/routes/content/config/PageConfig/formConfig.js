export default {
  fields: [
    {
      field: 'content', label: '内容', type: 'rich-text',
      rules: [
        { required: true, message: '该项是必填的' }
      ],
    },
  ],
}