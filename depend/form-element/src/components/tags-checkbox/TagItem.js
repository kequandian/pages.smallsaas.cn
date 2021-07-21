/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <TagItem>
      data = {}
      checked = false   //是否选中
      options = {}
    </TagItem>
 */

import React, { Fragment } from 'react';
import './style.css';

export default (props) => {
  function handleClick() {
    const { data, checked } = props;
    props.onChange(data,!checked);
  }

  const { data, checked, options } = props;
  return <Fragment>
      <div className={ `tagItemBox ${checked ? 'checked' : ''}` } onClick={ handleClick }>{ data[options.name] || data.tagName }</div>
    </Fragment>
}
