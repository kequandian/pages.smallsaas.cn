module.exports = {
  "fields": [
    {
      "field": "title",
      "label": "名称"
    },
    {
      "field": "sticky",
      "label": "排序",
      "type": "number"
    },
    {
      field: 'cover', label: '封面', type: 'upload-image',
      options: {
        max: 1,
        API: '/api/upload/files',
      }
    },
    { field: 'summary', label: '内容', type: 'rich-text' },
    { field: 'type', label: '', type: 'hidden', value: 'LORE' },
  ]
}