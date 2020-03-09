const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOKEN_RECEIVED':
      return { ...state, validToken: action.payload }
    default:
      return state
  }
}