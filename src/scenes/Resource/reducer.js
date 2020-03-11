const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'RESOURCE':
      return action.payload;
    default:
      return state;
  }
}