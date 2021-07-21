import React from 'react';

class LegendText extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const { list= [] } = this.props;

    const style = {
      display: 'flex',
      justifyContent: 'center',
      margin: '0.3em 0'
    }

    const colorStyle = (value) => {
      return {
        backgroundColor: value,
        width: '20px',
        height: '15px',
        display: 'inline-block',
        marginRight: '0.3em'
      }
    }

    return (
      <div style={style}>
        {
          list.length > 0 && list.map((item,index) => (
            <div key={index} style={{display: 'flex',alignItems: 'center',marginRight: '1em',fontSize: '12px'}}>
              <span style={colorStyle(item.color)}></span>
              <span>{item.name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

export default LegendText
