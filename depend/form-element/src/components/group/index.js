/**
    * @author
    * @editor
    * @updated
    * @desc    只显示一个id
    * @eg
    <Group>
      id = ''     //传入id
    </Group>
 */

import React, { Component } from 'react';

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
	const style = {
		padding: '1em 0 0.2em 2em',
		fontSize: '1.2em',
		color: '#1890ff',
	}

    return (
      <div style={style}>{this.props.id}</div>
    );
  }
}
