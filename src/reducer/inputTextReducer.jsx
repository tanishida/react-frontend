import * as types from '../actionTypes/index';

const initialState = {
  text: '',
  message: [],
  name: '',
  progress: false
};

export default function inputTextReducer(state = initialState, action) {
  switch (action.type) {
    case types.TEXT_SET:
      return {
        text: action.val,
        message: action.list,
        name: state.name,
        progress: state.progress
      };
    case types.TEXT_ADD:
      return {
        text: state.text,
        message: action.message,
        name: state.name,
        progress:state.progress
      };
    case types.TEXT_DELETE:
      return {
        text: '',
        message: state.message,
        name: state.name
      };
    case types.FORM_DELETE:
      return {
        text: '',
        message: state.message,
        name: state.name
      };
    case types.NAME_SET:
      return {
        text: state.text,
        message: state.message,
        name: action.name,
        progress: state.progress
      };
    case types.PROGRESS_TOGGLE:
      return {
        text: state.text,
        message: state.message,
        name: action.name,
        progress: !state.progress
      }
    default:
    return state;
  }
}