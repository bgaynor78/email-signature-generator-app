import { GENERATE_SIGNATURE } from "../actions";

export default function(state = {}, action) {

  switch(action.type) {
    case GENERATE_SIGNATURE:
      return {
        formElements: action.payload
      };

    default:
      return state;
  }
}