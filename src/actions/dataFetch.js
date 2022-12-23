import {GET_DATA} from "./types";

export const getData = (start,end) => async dispatch => {
    const API_END = `https://go-dev.greedygame.com/v3/dummy/report?startDate=${start}&endDate=${end}`;
    let det
    try{
        await fetch(API_END)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                console.log(data);
                det = data.data
                console.log(det)
            })
        dispatch({
            type: GET_DATA,
            payload: det
        })
    }catch (e) {
        console.log(e)
    }
}