import axios from "axios";
import { addItem, removeItem } from "../slices/cartSlice"; // Adjust the import path as necessary

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(addItem({
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countinstock: data.countinstock,
      qty,
    }));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(removeItem(productId));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
