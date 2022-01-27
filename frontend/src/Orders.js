import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await (await axios.get('http://localhost:8090/order')).data;
            // console.log(data);
            setOrders(data);
        }
        getData();
    }, [])

    return (
        <div className="App container mt-3">
            <h3>Orders</h3>
            <Row>
                {orders.map((order, index) => {
                    return (
                        <Col key={index} sm={4} className="my-3">
                            <Card className="bg-dark text-white">
                                <Card.Header style={{height: "80px"}}><h6>{order.id}</h6></Card.Header>
                                <hr/>
                                <Card.Body style={{height: "200px", textAlign: "left"}}>
                                    {order.order.map((item, ind) => {
                                        return(
                                            <Card.Subtitle key={ind}><h4>{(ind+1) +" . "}{item}</h4></Card.Subtitle>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
