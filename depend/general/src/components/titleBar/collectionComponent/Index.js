import React,{Component} from 'react';

import collectionOn from '../icons/collectionOn-icon.png'
import collectionOff from '../icons/collectionOff-icon.png'

class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      key:0,
      status : false,
      imgBox:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.3125rem',
        ...props.imgBox
      },
      imgCss:{
        width:'1.3125rem',
        heidht:'1.3125rem',
        ...props.imgCss
      }

    }
  }

  componentDidMount() {
    const { status } = this.props;
    this.setState({
      status
    })
  }


  componentWillReceiveProps(newProps){
    const { status } = newProps;
    this.setState({
      status
    })
  }

  switchType=(v)=>{
    if(this.props.onSwitch){
      this.props.onSwitch()
    }else{
      console.log('onSwitch is null');
      const status = !v;
      this.setState({
        status
      })
    }
  }

  render() {

    const { key, status, imgBox, imgCss } = this.state;

    return (
      <div style={imgBox} onClick={()=>this.switchType(status)}>
        <img
          key={key}
          style={imgCss}
          src={status ? collectionOn : collectionOff}/>
      </div>

    );
  }

}

export default Index;
