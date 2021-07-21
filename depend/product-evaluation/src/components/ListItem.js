import React, { Fragment } from 'react';
const ListItem = ({ data = [], children, value, valueField, onClick }) => {
    function handleClick(i,data){
      if(onClick){
        onClick(i,data);
      }
    }
    return (
      <Fragment>
          { data.map( (v, i) => {
              return <span onClick={ handleClick.bind(null,i,v) } key={i}>
                { React.cloneElement(children,{
                      data: v,
                      className: value === v[valueField] ? `${children.props.className} active` : children.props.className,
                  }) }
              </span>;
          }) }
      </Fragment>
    );
}
export default ListItem;