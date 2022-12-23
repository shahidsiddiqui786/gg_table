import {GET_DATA} from "../actions/types";

const initialState = {
    data: null
};

export default function (state=initialState,action) {
    const {type,payload}= action;

    if (type === GET_DATA) {
        return{
            ...state,
            data: payload
        };
    } else {
        return state
    }
}