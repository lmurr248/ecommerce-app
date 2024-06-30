import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";

function CartScreen() {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      const qty = location.search
        ? Number(new URLSearchParams(location.search).get("qty"))
        : 1;
      dispatch(addItem({ productId, qty }));
    }
  }, [dispatch, productId, location.search]);

  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=shipping");
  };

  const updateQtyHandler = (productId, qty) => {
    dispatch(addItem({ product: productId, qty })); // Dispatch addItem with the updated qty
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          {cartItems.map((item) => (
            <li key={item.product}>
              <div className="cart-image">
                <img src={item.image} alt="product" />
              </div>
              <div className="cart-name">
                <div className="cart-product-title">
                  <h3>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </h3>
                </div>
                <div>
                  Qty:{" "}
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      updateQtyHandler(item.product, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countinstock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>{" "}
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="cart-price">£{item.price}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : £
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
