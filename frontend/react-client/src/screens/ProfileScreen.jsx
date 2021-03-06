import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [fromDate, setFromDate] = useState(new Date("July 20, 69 00:20:18 GMT+00:00"));
    const [untilDate, setUntilDate] = useState(new Date().getTime());
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else if (!user || !user.name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetails("profile"));
            dispatch(listMyOrders());
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitUpdateProfileHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    };

    const submitSearchOrdersHandler = (e) => {
        e.preventDefault();
        dispatch(listMyOrders(fromDate, untilDate, minPrice, maxPrice));
    };

    return (
        <Row>
            <Col md={2}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitUpdateProfileHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            size="sm"
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            size="sm"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            size="sm"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" size="sm">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={10}>
                <h2>My Orders</h2>

                <Form onSubmit={submitSearchOrdersHandler} inline>
                    <Form.Group controlId="fromDate">
                        <Form.Label className="mb-2 mr-sm-2">From</Form.Label>
                        <Form.Control
                            size="sm"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="mb-2 mr-sm-2"
                        />
                    </Form.Group>

                    <Form.Group controlId="untilDate">
                        <Form.Label className="mb-2 mr-sm-2">until</Form.Label>
                        <Form.Control
                            size="sm"
                            type="date"
                            value={untilDate}
                            onChange={(e) => setUntilDate(e.target.value)}
                            className="mb-2 mr-sm-2"
                        />
                    </Form.Group>

                    <Form.Group controlId="minPrice">
                        <Form.Control
                            size="sm"
                            placeholder="Min Price"
                            type="money"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="mb-2 mr-sm-2"
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="maxPrice">
                        <Form.Control
                            size="sm"
                            placeholder="Max Price"
                            type="money"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="mb-2 mr-sm-2"
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" className="mb-2" size="sm">
                        Search
                    </Button>
                </Form>

                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default ProfileScreen;
