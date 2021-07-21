import React, { Fragment } from 'react';
const ListItem = ({ data = [], children, index, onClick }) => {
    function handleClick(i){
      if(onClick){
        onClick(i);
      }
    }
    return (
      <div style={{overflow: 'hidden'}}>
          { data.map( (v, i) => {
              return <span onClick={ handleClick.bind(null,i) } key={i}>
                { React.cloneElement(children,{
                      data: v,
                      className: index === i ? `${children.props.className} active` : children.props.className,
                  }) }
              </span>;
          }) }
      </div>
    );
}
export default ListItem;