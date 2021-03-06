import axios from "axios";
import {
    HOUSEHOLD_LIST_REQUEST,
    HOUSEHOLD_LIST_SUCCESS,
    HOUSEHOLD_LIST_FAILURE,
    HOUSEHOLD_DETAILS_REQUEST,
    HOUSEHOLD_DETAILS_SUCCESS,
    HOUSEHOLD_DETAILS_FAILURE,
    HOUSEHOLD_ADD_ORDER_REQUEST,
    HOUSEHOLD_ADD_ORDER_SUCCESS,
    HOUSEHOLD_ADD_ORDER_FAILURE,
    HOUSEHOLD_ORDERS_REQUEST,
    HOUSEHOLD_ORDERS_SUCCESS,
    HOUSEHOLD_ORDERS_FAILURE,
    HOUSEHOLD_CREATE_REQUEST,
    HOUSEHOLD_CREATE_SUCCESS,
    HOUSEHOLD_CREATE_FAILURE,
} from "../constants/householdConstants";

export const listHouseholds = () => async (dispatch) => {
    try {
        dispatch({ type: HOUSEHOLD_LIST_REQUEST });

        const { data } = await axios.get(`/api/households`);

        dispatch({
            type: HOUSEHOLD_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: HOUSEHOLD_LIST_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listHouseholdDetails = (cityId) => async (dispatch) => {
    try {
        dispatch({ type: HOUSEHOLD_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/households/${cityId}`);

        dispatch({
            type: HOUSEHOLD_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: HOUSEHOLD_DETAILS_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addOrderToHousehold = (orderId, householdId) => async (dispatch) => {
    try {
        dispatch({ type: HOUSEHOLD_ADD_ORDER_REQUEST });

        const { data } = await axios.post(`/api/households/${householdId}`, { orderId });

        dispatch({
            type: HOUSEHOLD_ADD_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: HOUSEHOLD_ADD_ORDER_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listHouseholdOrders = (groupOrderId) => async (dispatch) => {
    try {
        dispatch({ type: HOUSEHOLD_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/households/orders/${groupOrderId}`);

        dispatch({
            type: HOUSEHOLD_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: HOUSEHOLD_ORDERS_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// export const deleteHouseHold = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: HOUSEHOLD_DELETE_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         await axios.delete(`/api/products/${id}`, config);

//         dispatch({
//             type: PRODUCT_DELETE_SUCCESS,
//         });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         if (message === "Not authorized, token failed") {
//             dispatch();
//         }
//         dispatch({
//             type: PRODUCT_DELETE_FAIL,
//             payload: message,
//         });
//     }
// };

export const createHousehold = (household) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOUSEHOLD_CREATE_REQUEST,
        });
        console.log(household);

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/households`, household, config);
        console.log(data);

        dispatch({
            type: HOUSEHOLD_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch();
        }
        dispatch({
            type: HOUSEHOLD_CREATE_FAILURE,
            payload: message,
        });
    }
};

// export const updateHousehold = (product) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_UPDATE_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data } = await axios.put(`/api/products/${product._id}`, product, config);

//         dispatch({
//             type: PRODUCT_UPDATE_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         if (message === "Not authorized, token failed") {
//             dispatch();
//         }
//         dispatch({
//             type: PRODUCT_UPDATE_FAIL,
//             payload: message,
//         });
//     }
// };
