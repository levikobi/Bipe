import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import StoreLocation from "../components/StoreLocation";
import { listHouseholds } from "../actions/householdActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function StoreAddressScreen({ match }) {
/*    const category = match.params.cityId;
    const keyword = match.params.city;*/

    const dispatch = useDispatch();

    const storeLocationList = useSelector((state) => state.storeLocationList);
    const { loading, error, storeLocations } = storeLocationList;
    

    useEffect(() => {
        dispatch(listHouseholds());
    }, [dispatch]);

    return (
        <>
            <h1>Choose your store location</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {storeLocations.map((storeLocation) => (
                        <Col key={storeLocation.cityId} sm={12} md={6} lg={4} xl={3}>
                            <StoreLocation household={storeLocation} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export default StoreAddressScreen;