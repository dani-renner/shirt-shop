export default (state = {}, action) => {
  const { name, description, quantity, price, id } = action;
  switch (action.type) {
    case 'ADD_SHIRT':
      return Object.assign({}, state, {
        [id]: {
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          id: id
        }
      });
    // case 'EDIT_SHIRT':
      
    //   const newState = { ...state, newState[id] };
    //   edit newState[id];
    //   return newState;
    case 'DELETE_SHIRT':
      const newState = { ...state };
      delete newState[id];
      return newState;
    default: 
      return state;  
  }
};