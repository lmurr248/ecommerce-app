
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      
      if (existItem) {
        // If item already exists in cart, update its quantity
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? { ...x, qty: item.qty } : x // Update qty to the new value
          )
        };
      } else {
        // If item doesn't exist in cart, add it
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
