import React from 'react'
import styled from 'styled-components'

import {Col, Container, Nav, NavItem, Row,} from 'shards-react'


import './notFoundLayout.scss'

import Navbar from '@elements/navbar/navbar'


const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`



export const notFoundLayout = (props) => {

  return (
    <Wrapper >
        <Navbar />
        <Container>
          <Row>
            <Col>
            { props.children }
            </Col>
          </Row>
        </Container>
        <Container className="mt-5 footer" fluid>
        <Col>
            <Container>
              <Col>
                <Nav className="smaller">
                <NavItem>
                  <span className="active nav-link smaller" style={{'color':'#a29898'}}>2009-2020 TEKTELIC Communications Inc.</span>
                </NavItem>
                <NavItem>
                  <a href="https://tektelic.com" className="active nav-link smaller">Tell us about your LoraWAN use cases.</a>
                </NavItem>
                </Nav>
              </Col>
            </Container>
          </Col>
        </Container>

    </Wrapper>
  )

}

export default notFoundLayout
