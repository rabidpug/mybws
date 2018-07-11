import React, { PureComponent, } from 'react'

import Card from 'Common/components/Card'

export default class MyHome extends PureComponent {
  componentDidMount () {
    document.title = 'myBWS'
  }

  render () {
    return (
      <Card>
        <Card.Header>
          <h1>Welcome to myBWS!</h1>
        </Card.Header>
        <Card.Body>
          <p>Welcome to the one stop shop for all BWS teams adhoc tasks and requests.</p>
        </Card.Body>
      </Card>
    )
  }
}
