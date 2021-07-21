import React, { Component } from 'react';
import queryString from 'querystring';

export default class SurveyFormEvent extends Component {
  constructor(props) {
    super(props);

    const { getAPI, createAPI, updateAPI } = props;
    props.dispatch.setAPI('getAPI', getAPI);
    props.dispatch.setAPI('createAPI', createAPI);
    props.dispatch.setAPI('updateAPI', updateAPI);

    this.type = queryString.parse(props.location.search).type;
  }
  componentDidMount() {
    if (this.type === 'edit') {
      this.handleGetData();
    }
  }
  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch.save({
      payload: {
        formData: {},
      }
    })
  }

  handleGetData = () => {
    const { dispatch } = this.props;
    const id = queryString.parse(this.props.location.search.replace('?','')).id;

    dispatch.fetchOne({
      payload: {
        id,
      }
    })
  }
  handleFieldsChange = (fields) => {
    const { dispatch } = this.props;
    const { formData = {} } = this.props.modelStatus || {};

    dispatch.save({
      payload: {
        formData: {
          ...formData,
          ...fields
        },
      }
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    return React.cloneElement(children,restProps);
  }
}