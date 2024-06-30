import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../slices/productSlice"; // Correct import path
import { addToCart } from "../actions/cartActions";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { _id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(productId, qty));
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  console.log("ProductId:", productId);
  console.log("Product:", product);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product Not Found</div>;

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numreviews}) reviews
            </li>
            <li>
              Price: <b>£{product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: £{product.price}</li>
            <li>
              Status: {product.countinstock > 0 ? "In stock" : "Out of stock"}
            </li>
            <li>
              Qty:{" "}
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(product.countinstock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {product.countinstock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="button primary full-width add-to-cart-btn"
                >
                  Add to Cart
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
