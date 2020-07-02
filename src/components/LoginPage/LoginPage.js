import React, {Fragment, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Card, Container, FormInput, Form, Row, Col, Button} from "shards-react";
import io from "socket.io-client";

export default function LoginPage(props) {

    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRedirect, setIsRedirect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [socket, setSocket] = useState(null)
    const [isSocketSetUp, setIsSocketSetUp] = useState(false)

    async function login() {
        socket.emit("login", {username, password})
    }

    useEffect(()=> {

        if (props.location.state) {
            if (!props.location.state.isLoggedIn)
                history.push('/login')
        }
        setSocket(io("http://swisscom-contact-tracin-demo-backend.ngrok.io"))
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {
            socket.on("login", (isCorrect) => {
                if (isCorrect) {
                    console.log("lol wtf")
                    history.push({pathname: '/', state: {isLoggedIn: true}})
                } else {
                    setIsWrong(true);
                }
            })
            setIsSocketSetUp(true);
        }
    }, [socket])

    return (
        <Fragment>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={12} lg={4} xs={12}/>
                <Col sm={12} lg={4} xs={12}>
                    <FormInput placeholder="Username" value={username} onChange={(event)=> {setUsername(event.target.value)}}/>
                </Col>
                <Col sm={12} lg={4} xs={12}/>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={12} lg={4} xs={12}/>
                <Col sm={12} lg={4} xs={12}>
                    <FormInput placeholder="Password" value={password} onChange={(event)=> {setPassword(event.target.value)}}/>
                </Col>
                <Col sm={12} lg={4} xs={12}/>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <Col sm={12} lg={4} xs={12}/>
                <Col sm={12} lg={4} xs={12}>
                    <Button onClick={login}>Login</Button>
                </Col>
                <Col sm={12} lg={4} xs={12}/>
            </Row>

            <Row style={{color: "red", justifyContent: 'center'}}>
                <Col sm={12} lg={4} xs={12}/>
                <Col sm={12} lg={4} xs={12}>
                    {isWrong ? "Wrong username or password" : null}
                </Col>
                <Col sm={12} lg={4} xs={12}/>
            </Row>

        </Fragment>
    )
}
