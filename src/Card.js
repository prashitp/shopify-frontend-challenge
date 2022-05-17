import React from 'react';
import {Row, Col} from 'antd';

function Card(props) {
  return (
    <div
      style={{
        backgroundColor: "#E0E0E0",
        display: "flex",
        justifyContent: "flex-start",
        width: "70%",
        padding: "0% 1% 1% 1%"
      }}
    >
      <Col>
        <Row>
          <h3>
            Prompt: {props.prompt} 
          </h3>
        </Row>
        <Row>
          Response: {props.response}
        </Row>
      </Col>
    </div>
  )
}

export default Card