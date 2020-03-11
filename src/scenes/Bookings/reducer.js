const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'BOOKINGS':
      return action.payload;
    default:
      return state;
  }
}