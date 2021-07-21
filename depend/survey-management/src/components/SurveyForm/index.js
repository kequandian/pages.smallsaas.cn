import React, { Component } from 'react';
import Event from './components/Event';
import Container from './components/Container';

export default class SurveyForm extends Component {

  render() {
    return <Event { ...this.props }>
      <Container />
    </Event>
  }
}