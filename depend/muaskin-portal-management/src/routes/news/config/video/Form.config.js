module.exports = {
  "fields": [
    {
      field: 'url', label: '视频', type: 'upload-file',
      options: {
        max: 1,
      }
    },
    { field: 'stockId', label: '', type: 'hidden', value: '1' },
    { field: 'stockType', label: '', type: 'hidden', value: 'website' },
  ]
}