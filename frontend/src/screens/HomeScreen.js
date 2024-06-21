import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions"; // Assuming you have this action

function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Ensure products is defined before sorting
  const sortedProducts =
    products && products.slice().sort((a, b) => a.id - b.id);

  return (
    <ul className="products">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        sortedProducts &&
        sortedProducts.map((product) => (
          <li key={product.id}>
            <div className="product">
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
              </Link>
              <div className="product-details">
                <div className="product-name">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">
                  £
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : product.price}
                </div>
                <div className="product-rating">
                  {product.rating} Stars ({product.numreviews} review)
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default HomeScreen;
