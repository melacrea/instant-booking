const initialState = {users:[]};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOKEN_RECEIVED':
      return { ...state, validToken: action.payload };
    case 'CURRENT_USER':
      return { ...state, id: action.payload.id, name: action.payload.name };
    default:
      return state;
  }
}