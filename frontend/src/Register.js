import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router';

export default function Register() {

    const username = useRef("");
    const password = useRef("");

    const [regStatus, setRegStatus] = useState([]);
    const [regError, setRegError] = useState("");

    async function postData() {
        const regData = await axios.post("http://localhost:8090/form", { "username": username.current.value, "password": password.current.value });
        console.log(regData);
        setRegStatus(regData);
    }

    useEffect(() => {

        async function checkHandler() {

                console.log(regStatus);

                if (regStatus.status === 200) {
                    window.location.assign("http://localhost:3000/login");
                } else if (regStatus.data === "MongoBulkWriteError") {
                    setRegError("User with that name already exists. Please try Logging In.");
                    setTimeout(() => {
                        window.location.assign("http://localhost:3000/login");
                    }, 4000);
                } else if (regStatus.data === "ValidationError") {
                    setRegError("Password Length must be atleast 8 characters");
                }
        }
        checkHandler();
    }, [regStatus]);

    return (
        <div className="App container mt-3" style={{ minHeight: "93vh" }}>
            <h3>Register</h3>
            <div>
                <input type="text" name="username" placeholder="username" ref={username} className="mb-3" />
                <br />
                <input type="password" name="password" placeholder="password" ref={password} className="mb-3" />
                <br />
                <button className="btn btn-primary" onClick={() => {
                    postData()
                }}>Login</button>
                <div>
                    <h3>{regError}</h3>
                </div>
                {(sessionStorage.getItem("token") !== null) ? <Navigate to="/" /> : <></>}
            </div>
        </div>
    )
}
