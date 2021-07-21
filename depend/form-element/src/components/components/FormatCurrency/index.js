import React from 'react';

export default ({ value }) => {
  value = parseFloat(value).toFixed(2) || 0;
  if( isNaN(value) ){
    value = 0;
  }
  const rst = `￥ ${value.toLocaleString('en-US',{useGrouping:true})}`;
  return <span style={{
    textAlign: 'right',
    display: 'inline-block',
    width: '100%'
  }}>{ rst }</span>;
}