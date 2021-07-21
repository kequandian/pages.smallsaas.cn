import React from 'react';
export default (props) => {
  const { data = [], children, ...restProps } = props;
  return data.map( (v,i) =>{
    return React.cloneElement(children,{
              key: i,
              data: v,
              ...restProps
          });
  } );
}