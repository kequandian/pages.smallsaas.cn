import React from 'react';
import './style.css';

const CommentItem = (props) => {
  const timeFormat = (time) => {
    if(time){
      return time.split(' ')[0];
    }
  }
  function handleDelete() {
    const { data } = props;
    if(props.onDelete){
      props.onDelete(data);
    }
  }
  const { data = {} } = props;
  return(
    <div className="content">
      <div className="consultItem">
            { data.avatar ? <img src={ data.avatar } /> : '' }
            <div className="rightView">
              <div className="name">
                <span>{data.name}</span>
                <span style={{fontSize:'0.85em'}}>{timeFormat(data.createTime)}</span>
              </div>
              <div className="problem">{data.content}</div>
              {/* <a className="textRight" onClick={ handleDelete }>删除</a> */}
            </div>
          </div>
    </div>
  )
}

export default CommentItem;
