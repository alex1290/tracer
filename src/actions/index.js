import * as actionTypes from "./types";

export const setTraceData = data => {
  return {
    type: actionTypes.SET_TRACE,
    payload: {
      trace: data
    }
  };
};