const currentRoom = (state = {}, action) => {
  switch (action.type) {
    case 'TOKEN_RECEIVED':
      return { ...state, validToken: action.payload }
    default:
      return state
  }
}
export default currentRoom