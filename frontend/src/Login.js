import axios from 'axios';
import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Login() {

    const username = useRef("");
    const password = useRef("");

    async function postData() {
        const token = await axios.post("http://localhost:8090/login", { username: username.current.value, password: password.current.value });
        // console.log(token.data);
        sessionStorage.setItem("token", token.data);
        window.location.reload();
    }

    return (
        <div className="App container mt-3" style={{ minHeight: "93vh" }}>
            <div>
                <h3>Login</h3>
                <div>
                    <input type="text" name="username" placeholder="username" ref={username} className="mb-3" />
                    <br />
                    <input type="password" name="password" placeholder="password" ref={password} className="mb-3" />
                    <br />
                    <Row style={{display: "flex", justifyContent: "center"}}>
                        <Col sm={2} className="mx-2">
                            <Link to="/register" style={{marginLeft: "30px", fontSize: "20px"}} >Register Here</Link>
                        </Col>
                        <Col sm={2}>
                            <button className="btn btn-primary" onClick={() => {
                                postData()
                            }}>Login</button>
                        </Col>
                    </Row>
                </div>
                {(sessionStorage.getItem("token") !== null) ? <Navigate to="/" /> : <></>}
            </div>
        </div>
    )
}
