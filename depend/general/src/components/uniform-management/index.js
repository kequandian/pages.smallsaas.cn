import React, { Component, Fragment } from 'react';

// import List from './components/List';
import Form from './components/Form';

export default class Index extends Component{
  constructor(props){
    super(props);
    this.state = {
      mount: 'list',
      data: {},
    }
  }

  onChangeComponent = (name, data = {}) => {
    this.setState({
      mount: name,
      data,
    });
  }
  renderComponent = () => {
    const { onListComponent = 'LIST TODO', onFormComponent = Form,
            onQueryComponent = 'QueryComponent is undefined' } = this.props;
    const { mount, data } = this.state;
    const mountComponent = mount === 'list' ? onListComponent : 
                           mount === 'form' ? onFormComponent : onQueryComponent;
    
    return React.cloneElement( mountComponent,{
      query: data,
    });
  }

  render(){
    return (
      <Fragment>
        { this.renderComponent() }
      </Fragment>
    );
  }
}