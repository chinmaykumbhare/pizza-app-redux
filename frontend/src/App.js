import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useReducer, useState } from 'react';
import { Card, Row, Col, Button, Collapse } from 'react-bootstrap';
import './App.css';

function App() {

  const [pizza, setPizza] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await (await axios.get("http://localhost:8090/")).data;
      // console.log(data);
      setPizza(data);
    }
    getData();
  }, []);

  function addPizza(pizza) {
    // console.log(pizza);
    setOrder([...order, pizza]);
  }

  const initialState = { order: [] };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "add":
        return { ...state, order: action.payload };
      case "remove":
        return { ...state, order: action.payload };
      default:
        return { state };
    }
  }

  const [globalOrder, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(order);
    // console.log(order.toString());
    dispatch({
      type: "add",
      payload: order
    })
  }, [order]);

  // useEffect(() => {
  //   console.log(globalOrder.order);
  // }, [globalOrder])

  const [open, setOpen] = useState(false);

  async function placeOrder() {
    await axios.post('http://localhost:8090/order', { pizza: globalOrder.order });
    window.location.assign("http://localhost:3000/orders");
  }

  async function logoutHandler() {
    sessionStorage.removeItem("token");
    window.location.assign("http://localhost:3000/login");
  }

  const [uid, setuid] = useState("");

  useEffect(() => {
    async function checkToken() {
      const token = sessionStorage.getItem("token");
      const auth = await (await axios.post("http://localhost:8090/check", { token: token })).data;
      // console.log(auth);
      if (auth.message) {
        alert(auth.message);
        sessionStorage.removeItem("token");
        window.location.assign("http://localhost:3000/login");
      } else {
        // console.log(auth);
        setuid(auth.uid);
      }
    }
    checkToken();
  }, []);

  return (
    <div className="App container mt-3">
      <Row>
        <Col sm={8} style={{ textAlign: "start" }}>
          <h3>Hello, {uid}!</h3>
        </Col>
        <Col sm={4} style={{ textAlign: "end" }}>
          <button className="btn btn-danger" onClick={() => {
            logoutHandler()
          }}>Logout</button>
        </Col>
      </Row>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="my-3"
      >
        Cart
      </Button>
      <Collapse in={open} style={{margin: "auto", width: "60%", marginBottom: "1rem"}}>
        <div id="collapse-items">
          <Card className="bg-dark text-white">
            <Card.Header>Your Order</Card.Header>
            {(globalOrder.order.length === 0) ? <Card.Body>
              <Card.Subtitle>Cart is empty</Card.Subtitle>
            </Card.Body> : (globalOrder.order.map((item, index) => {
              return (
                <div key={index} className="text-start container">
                  {item}
                  <button className="btn btn-danger mx-2" style={{float: "right"}} onClick={() => {
                    const arr = globalOrder.order;
                    const newArr = arr.filter(function (value) {
                      return value !== item
                    });
                    // console.log(newArr);
                    dispatch({
                      type: "remove",
                      payload: newArr
                    })
                  }}>X</button>
                  <hr />
                </div>
              )
            }))}
            {(globalOrder.order.length > 0) && <button className="btn btn-primary"
              onClick={() => {
                placeOrder();
              }}>Place Order</button>}
          </Card>
        </div>
      </Collapse>
      <Row>
        {pizza.map((item, index) => {
          return (
            <Col sm={4} key={index} className="my-2">
              <Card className="bg-dark text-white">
                <Card.Header style={{ height: "120px" }}>{item.name}</Card.Header>
                <Card.Img src={item.image} height="160px" style={{ width: "90%", marginLeft: "5%" }}></Card.Img>
                <Row className="p-1 mt-2">
                  <Col>
                    <button className="btn btn-success" onClick={() => addPizza(item.name)}>+</button>
                  </Col>
                  <Col className="mt-1">
                    <p>Add</p>
                  </Col>
                  <Col>
                    <button className="btn btn-danger" onClick={() => {
                      const arr = globalOrder.order;
                      const newArr = arr.filter(function (value) {
                        return value !== item.name
                      });
                      // console.log(newArr);
                      dispatch({
                        type: "remove",
                        payload: newArr
                      })
                    }}>-</button>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  );
}

export default App;
