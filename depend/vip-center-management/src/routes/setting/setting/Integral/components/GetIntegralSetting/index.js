import React, { Fragment, Component } from 'react';
import { GMApp } from 'kqd-general';
import { Alert } from 'antd';

import SwitchAndSubmit from '../../../components/SwitchAndSubmit';

const Form = GMApp.Form;

export default class GetIntegralSetting extends Component{
  render(){
    const { config, ...restProps } = this.props;
    return <Fragment>
      <Form { ...restProps } config={ config }
        APIObject={{
          API: '/api/vip/account/grades/bulk',
          getAPI: null, // 设置 null 来让 Form 不自动获取数据。因为在下面有通过 FORMTYPE 把表单标记为 update Form
                        // 而 update Form 默认是会获取数据的
          updateAPI: '/api/vip/account/grades/bulk',
        }}
        formProps={{
          // 在顶部渲染 切换按钮 与 保存按钮
          beforeFieldComponent: <SwitchAndSubmit switchField={ config.switchField } title={ config.header.title } requester={ this.props.requester } />,
          // 渲染额外的提示信息
          beforeChildrenComponent: (<Fragment>
            { config.message ? (<Fragment>
              <Alert message={ config.message } type="info" showIcon />
              <br />
            </Fragment>) : '' }
          </Fragment>),
          submitForm: <span></span>, // 去掉底部的默认的 提交按钮
          FORMTYPE: 'update', // 标明该 Form 是为 update 表单
          ALWAYSRENDER: true, // 直接渲染 fields
        }}
        dataSourceMap="grades" // 默认情况下， Form 会使用 modelStatus currentItem 里面的数据进行渲染
                               // 使用 dataSourceMap 来修改为从 modelStatus grades currentItem 里面获取数据进行渲染
        REDIRECT="/vip-setting" // 表单提交后重定向到这个路由
      />
    </Fragment>;
  }
}
// import React, { Fragment, Component } from 'react';
// import { GMAppForm } from 'kqd-general';
// import { Alert } from 'antd';

// import SwitchAndSubmit from '../../../components/SwitchAndSubmit';

// export default class GetIntegralSetting extends Component{
//   render(){
//     const { config, noSwitch = false } = this.props;
//     return <Fragment>
//       <GMAppForm { ...this.props } config={ config }
//         formProps={{
//           title: false,
//         }}
//         beforeFieldComponent={<SwitchAndSubmit noSwitch={ noSwitch } title={ config.header.title } />}
//         beforeChildrenComponent={
//           (<Fragment>
//             { config.message ? (<Fragment>
//               <Alert message={ config.message } type="info" showIcon />
//               <br />
//             </Fragment>) : '' }
//           </Fragment>)
//         } 
//         submitForm={ <span></span>}
//         FORMTYPE="update"
//         ALWAYSRENDER={ true }
//         APIObject={{
//           getAPI: null,
//         }}
//         REDIRECT="/vipManagement?type=setting"
//         dataSourceMap="grades"
//       />
//     </Fragment>;
//   }
// }