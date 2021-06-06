import {
    HOUSEHOLD_LIST_REQUEST,
    HOUSEHOLD_LIST_SUCCESS,
    HOUSEHOLD_LIST_FAILURE,
    HOUSEHOLD_DETAILS_REQUEST,
    HOUSEHOLD_DETAILS_SUCCESS,
    HOUSEHOLD_DETAILS_FAILURE,
} from "../constants/householdConstants";

export const householdListReducer = (state = { storeLocations: [] }, action) => {
    switch (action.type) {
        case HOUSEHOLD_LIST_REQUEST:
            return { loading: true, storeLocations: [] };
        case HOUSEHOLD_LIST_SUCCESS:
            return { loading: false, storeLocations: action.payload };
        case HOUSEHOLD_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const householdDetailsReducer = (state = { household: {} }, action) => {
    switch (action.type) {
        case HOUSEHOLD_DETAILS_REQUEST:
            return { loading: true, ...state };
        case HOUSEHOLD_DETAILS_SUCCESS:
            return { loading: false, household: action.payload };
        case HOUSEHOLD_DETAILS_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
