/**
    * @author
    * @editor
    * @updated
    * @desc   树形选择组件，从api中获取数据源，然后选取值
    * @eg
    <DepartmentSelect>
       width = ''        //树形选择器最小高度是160px，可以传入高度修改
       value = ''        //树形选择框的值
       onChange = {(data) => {}}     //树形选择框的值发生改变的时候触发的回调函数
    </DepartmentSelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { TreeSelect } from 'antd';
import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

export default class Index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      API: '/api/org/dept/groups',
      options: [],
      dataLoaded: false,
      dataLoading: false,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  getFormattedChild(item, index) {
    if (item) {
      let result = {};
      result.key = index;
      result.value = item.id
      result.label = item.name;
      if (item.items) {
        result.children = item.items.map((child, childIndex) => {
          return this.getFormattedChild(child, `${index}-${childIndex}`);
        });
      }
      return result;
    }
  }

  handleFocus = () => {
    //模拟数据
    // const departmentsData = [
    //   {
    //     "note":"",
    //     "code":"FJGCB",
    //     "name":"中电富嘉工程部",
    //     "fullName":"中电富嘉工程部",
    //     "location":"广州",
    //     "id":"939401590463287298",
    //     "sort":1,
    //     "items":[
    //       {
    //         "code":"SIMAYWZ",
    //         "name":"SIMA现场运维组",
    //         "fullName":"SIMA现场运维组",
    //         "location":"委内瑞拉",
    //         "pid":"939401590463287298",
    //         "id":"969021556804026369",
    //         "sort":2,
    //         "items":[
    //           {
    //             "code":"111111111111111",
    //             "name":"测试部",
    //             "fullName":"1111111",
    //             "pid":"969021556804026369",
    //             "id":"973922282986655746"
    //           }
    //         ]
    //       },
    //       {
    //         "note":"后勤部，保障工作，保障生活。",
    //         "code":"09",
    //         "name":"委内后勤",
    //         "fullName":"委内瑞拉后勤部门",
    //         "location":"05",
    //         "pid":"939401590463287298",
    //         "id":"973931762004643841",
    //         "sort":6
    //       }
    //     ]
    //   },
    //   {
    //     "code":"MPPRIJP",
    //     "name":"委内瑞拉内政部",
    //     "fullName":"委内瑞拉内政部",
    //     "location":"委内瑞拉",
    //     "id":"962864921068982273",
    //     "sort":3,
    //     "items":[
    //       {
    //         "code":"Baruta",
    //         "name":"Baruta911中心",
    //         "fullName":"Baruta911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"962865171171135489",
    //         "sort":4
    //       },
    //       {
    //         "code":"Coche",
    //         "name":"Coche911中心",
    //         "fullName":"Coche911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969021972736376833",
    //         "sort":4
    //       },
    //       {
    //         "code":"Sucre",
    //         "name":"Sucre911中心",
    //         "fullName":"Sucre911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969022130358321153",
    //         "sort":4
    //       },
    //       {
    //         "code":"Maracaibo",
    //         "name":"Maracaibo911中心",
    //         "fullName":"Maracaibo911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969022413507395585",
    //         "sort":4
    //       },
    //       {
    //         "code":"Barcelona",
    //         "name":"Barcelona911中心",
    //         "fullName":"Barcelona911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969022573494927362",
    //         "sort":4
    //       },
    //       {
    //         "code":"Margarita",
    //         "name":"Margarita911中心",
    //         "fullName":"Margarita911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969022718160666626",
    //         "sort":4
    //       },
    //       {
    //         "code":"Barinas",
    //         "name":"Barinas911中心",
    //         "fullName":"Barinas911中心",
    //         "location":"委内瑞拉",
    //         "pid":"962864921068982273",
    //         "id":"969049689154387970",
    //         "sort":4
    //       }
    //     ]
    //   },
    //   {
    //     "code":"FJZHB",
    //     "name":"中电富嘉综合部",
    //     "fullName":"中电富嘉综合部",
    //     "location":"广州",
    //     "id":"962865466232033281",
    //     "sort":1,
    //     "items":[]
    //   },
    //   {
    //     "note":"阿师德师风个",
    //     "code":"888",
    //     "name":"市场营销部门",
    //     "fullName":"营销",
    //     "location":"111111",
    //     "id":"988967068965548033",
    //     "sort":2,
    //     "items":[]
    //   }
    // ];

    const { dataLoaded, API } = this.state;
    if (!dataLoaded) {
      this.setState({
        dataLoading: true,
      });

      // //api暂时接不上，先使用假数据：
      // const options = departmentsData.map((item, index) => this.getFormattedChild(item, index))
      // this.setState({
      //   dataLoaded: true,
      //   dataLoading: false,
      //   options
      // })

      //todo 解除此注释
      query(API).then(({ code, data, message }) => {
        this.setState({
          dataLoaded: true,
          dataLoading: false,
          options: data.map((item, index) => this.getFormattedChild(item, index))
        })
      })
    }
  }

  // handleChange(value, label, extra) {
  //   console.log('value ===', value);
  //   console.log('label ===', label);
  //   console.log('extra ===', extra);
  // }

  render() {
    const { options, dataLoading } = this.state;
    let style = { minWidth: 160 };
    if (this.props.width) {
      style.width = this.props.width;
    }

    return (
      <TreeSelect
          defaultValue={this.props.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={options}
          placeholder={<FormattedMessage id='department.select.placeholder' />}
          treeDefaultExpandAll
          onFocus={this.handleFocus.bind(this)}
          onChange={this.props.onChange}
        />
    )
  }
}
