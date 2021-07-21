import React, { PureComponent } from 'react';

import { UniformForm } from 'kqd-general';

export default class Demo extends PureComponent {

  render() {
    const formProps = {
      ignoreFetch: true,
      fields: [
        {
          field: 'role',
          type: 'role-select'
        },
        {
          field: 'department',
          type: 'department-select'
        },
        // {
        //   field: 'pcd',
        //   type: 'pcd-select'
        // },
        {
          field: 'group',
          type: 'group-checkbox'
        },
        {
          field: 'fieldConfig',
          type: 'field-config-select'
        },
        {
          field: 'avatar',
          type: 'avatar-upload',
          props: {
            value: [
              {
                url:"http://120.79.77.207:8080/images/null/0f4a2dfd-5795-4e14-9535-070401503a93.png"
              },
              {
                url: "http://112.74.26.228:8000/876708082437197824/cb2b678b-d264-49d8-bff4-b880e6c2cd54.png"
              }
            ]
          }
        }
      ]
    };

    return (
      <div>
        <UniformForm {...formProps} />
      </div>
    )
  }
}
