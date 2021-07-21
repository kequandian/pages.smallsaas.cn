import React, { createContext } from 'react';

const { Provider, Consumer } = createContext();

let self = null;
let permissionsCache = null;
class PermissionsProxy extends React.Component {
  state = {
    permList: {},
  };
  constructor(props) {
    super(props);
    self = this;
    if(permissionsCache){
      setPerm(permissionsCache);
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }

}

const Permissions = ({ permKey, children, ...props }) => {
  return <Consumer>
    { context => {
      if(context.permList[permKey]){
        return React.cloneElement(children,props);
      }
      return null;
    }}
  </Consumer>
};

function getPerm() {
  if (self && self.state.permList) {
    return self.state.permList;
  }
  return {};
}

function setPerm(args) {
  if (self) {
    if( !(args instanceof Array) ){
      args = [ args ];
    }
    const temp = {};
    args.forEach( key => {
      temp[key] = true;
    } )
    self.setState({
      permList: {
        ...getPerm(),
        ...temp,
      }
    });
  } else {
    console.warn('调用之前，需要先使用 <PermissionsProxy></PermissionsProxy> 包裹整个应用的入口');
    permissionsCache = args;
  }
}

function clearPerm() {
  if (self) {
    self.setState({
      permList: {},
    });
    return true;
  }
  return false;
}

function createPerm() {
  return { getPerm, setPerm, clearPerm };
}
export { PermissionsProxy, Permissions, createPerm };
