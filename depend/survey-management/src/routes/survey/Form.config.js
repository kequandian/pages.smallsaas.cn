export default {
  layout: 'Grid',
  title: '编辑测试问卷',
  items: [
    {
      ACTIONTYPE: 'edit',
      span: 24,
      layout: 'DefaultForm',
      component: 'SurveyForm',
      config: {
        API: {
          getAPI: '/api/survey/surveys/[id]',
          updateAPI: '/api/survey/surveys/[id]',
        },
        fields: [
          {
            field: 'title', label: '测试问卷名称', type: 'input',
            rules: [
              { required: true, message: '该项是必填的' }
            ],
          },
          {
            field: 'type', label: '问卷类型', type: 'select',
            options: [
              { title: 'C 端', value: 'CTest' },
              { title: 'Pad 端', value: 'PadTest' },
            ],
            rules: [
              { required: true, message: '该项是必填的' }
            ],
          }
        ],
        // REDIRECT: false,
      },
    },
  ],
}