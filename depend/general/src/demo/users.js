import baseModel from '../models/baseModel';
import modelExtend from '../models/model-extend';

export default modelExtend(baseModel, {
  namespace: 'users',
  state: {
    API: '/api/adm/users',
    fields: [
      {
        field: 'group1',
        label: '',
        type: 'group',
      },
      {
        field: 'avatar',
        type: 'avatar-upload',
      },
      {
         field: 'account',
         type: 'select',//, password, number, input,email ,phone, mobile,idcard, datetime,
         value: 'b',
         options: [
           { key: 'A', value: 'a' }, { key: 'B', value: 'b' }, { key: 'C', value: 'c' }
         ],
         rules: [
           { required: true }
         ]
      },
      {
        field: 'password',
        type: 'password',
        rules: [
          { required: true }
        ]
      },
      {
        field: 'group2',
        label: '',
        type: 'group',
      },
      {
        field: 'plain',
        label: 'plain',
        type: 'plain',
        value: 'this is plain',
      },
      {
        field: 'count',
        type: 'number',
        disabled: true,
        value: 5,
      },
      {
        field: 'perms',
        type: 'checkbox',
        value: [ 'edit' ],
        options: [
          {
            key: 'ADD',
            value: 'add'
          },
          {
            key: 'EDIT',
            value: 'edit'
          }
        ]
      },
      {
        field: 'items',
        type: 'children',
        columns: [
          { title: 'ID', dataIndex: 'id' },
          { title: 'Name', dataIndex: 'name' },
          { title: 'Description', dataIndex: 'description' },
        ]
      },
      {
        field: 'items2',
        type: 'children',
        columns: [
          { title: 'ID', dataIndex: 'id' },
          { title: 'Name', dataIndex: 'name' },
          { title: 'Description', dataIndex: 'description' },
        ]
      },
      {
        field: 'hiddenField', 
        label: '',
        type: 'hidden',
        value: 'test',
        attrs: {
            hidden: true, // 凡是带有这条属性的，表单域都不会渲染在界面上(display: none)
        }
    },
    ]
  }
});
