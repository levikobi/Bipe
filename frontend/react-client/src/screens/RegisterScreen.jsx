import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const [homeAddress, setHomeAddress] = useState({
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const [workAddress, setWorkAddress] = useState({
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push('/verification');
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password, homeAddress, workAddress));
        }
    };

    const handleHomeAddressChange = (event) => {
        const { name, value } = event.target;
        setHomeAddress((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const handleWorkAddressChange = (event) => {
        const { name, value } = event.target;
        setWorkAddress((prevValue) => ({ ...prevValue, [name]: value }));
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <h2>Home Address</h2>

                <Form.Group controlId="homeStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={homeAddress.street}
                        name="street"
                        onChange={handleHomeAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="homeCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={homeAddress.city}
                        name="city"
                        onChange={handleHomeAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="homeCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={homeAddress.country}
                        name="country"
                        onChange={handleHomeAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="homePostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={homeAddress.postalCode}
                        name="postalCode"
                        onChange={handleHomeAddressChange}
                    ></Form.Control>
                </Form.Group>

                <h2>Work Address</h2>

                <Form.Group controlId="workStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={workAddress.street}
                        name="street"
                        onChange={handleWorkAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="workCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={workAddress.city}
                        name="city"
                        onChange={handleWorkAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="workCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={workAddress.country}
                        name="country"
                        onChange={handleWorkAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="workPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={workAddress.postalCode}
                        name="postalCode"
                        onChange={handleWorkAddressChange}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
