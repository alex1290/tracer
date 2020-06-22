import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialTraceState = {
  traceData:[]
};

const trace_reducer = (state = initialTraceState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACE:
      return {
        traceData: action.payload.trace
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  traceAction: trace_reducer,
});

export default rootReducer;
