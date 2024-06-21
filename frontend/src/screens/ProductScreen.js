import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        product && (
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
                  {product.rating} Stars ({product.numReviews}) reviews
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
                <li>Status: {product.countInStock > 0 ? "In stock" : "Out of stock"}</li>
                <li>
                  Qty:{" "}
                  <select value={qty} onChangeCapture={(e) => {setQty(e.target.value)}}>
                    {[...Array(product.countInStock).keys()].map((x) => 
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0  && (
                    <button className="button primary" onClick={handleAddToCart}>Add to cart</button>
                  ) }
                </li>
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductScreen;
