import React from 'react'
import { Row, Label, Col } from 'reactstrap'
import PropTypes from 'prop-types'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 0.3,
      marginTop: 0,
      marginBottom: '0.9em'
    }}
  />
)

ColoredLine.propTypes = {
  color: PropTypes.string.isRequired
}

const Labelku = props => {
  const { title, value, index } = props
  const content = (
    <>
      <Row style={{ marginTop: '0.7em', textAlign: 'left' }}>
        {/* <Col md="2" style={{ marginTop: '0.5em',  textAlign: 'left'}}> */}
        <Col md='4'>
          <Label key={index} style={{ fontSize: '1.1em' }}>
            {title}
          </Label>
        </Col>
        {/* <Col xs="12" md="10" style={{ marginTop: '0.5em',  textAlign: 'left'}}> */}
        <Col xs='12' md='8'>
          <Label key={index} style={{ fontSize: '1.1em' }}>
            <strong>
              {value}
            </strong>
          </Label>
        </Col>
      </Row>
      <ColoredLine color='#F0F3F5' />
    </>
  )

  return content
}

export default Labelku
