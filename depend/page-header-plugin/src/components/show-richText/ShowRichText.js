/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc   展示富文本内容，头部是页面标题名称，下面展示富文本的内容
    * @eg
    <ShowRichText>
      title = ''
      content = ''
    </ShowRichText>
 */

import React from 'react';
import './style.css';
import arrowIcon from './icons/arrow.png';

class ShowRichText extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      content: props.content || '',
      title: props.title || ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      content: nextProps.content || '',
      title: nextProps.title || ''
    })
  }

  createMarkup(text) {
    return { __html: text };
  };

  goBack = () => {
    if(this.props.goBack){
      this.props.goBack()
    } else {
      history.go(-1);
    }
  }

  render(){

    const { content,title } = this.state;

    return(
      <div className='content'>
        <div className='title'>
          <img src={arrowIcon} className='titleIcon' onClick={() => this.goBack()}/>
          <div className='titleText'>{title || ''}</div>
        </div>
        <div style={{marginTop:'2.8125em'}}>
          <div className='htmlContent' dangerouslySetInnerHTML={this.createMarkup(content)}></div>
        </div>
      </div>
    )
  }
}

export default ShowRichText;
