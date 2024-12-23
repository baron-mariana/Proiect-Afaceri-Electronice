/*import { useEffect, useState } from "react";
import { getProducts } from "../routes/products";
import { addToCart, updateCart } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = (props) => {
  const { filters, sorting } = props;
  const { cart } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const handleGetProducts = async () => {
    try {
      const response = await getProducts(filters, sorting);
      setProducts(response.products);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const addProductToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      dispatch(
        updateCart({
          id: product.id,
          name: product.title,
          img: product.thumbnail,
          quantity: existingProduct.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters, sorting]);

  return (
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.title} />
          <h2 className="product-title">{product.title}</h2>
          <div className="rating">
            {renderStars(Math.round(product.rating))}
            <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
              {product.rating}
            </span>
            <span>({product.reviews.length})</span>
          </div>
          <div className="price-cart">
            <p className="price">${product.price.toFixed(2)}</p>
            <div>
              <button className="add-to-cart" onClick={() => addProductToCart(product)}>
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;*/

/*  varianta cu lista produse
import { useEffect, useState } from "react";
import { getProducts } from "../routes/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../store/slices/cartSlice";

const Products = (props) => {
  const { filters, sorting } = props;
  const [products, setProducts] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleGetProducts = async () => {
    try {
      console.log("Fetching products with filters:", filters); // Debugging
      const response = await getProducts(filters, sorting);
      setProducts(response.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters, sorting]);

  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2 className="product-title">{product.title}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No products found for the selected category.</p>
      )}
    </div>
  );
};

export default Products; */

import { useEffect, useState } from "react";
import { getProducts } from "../routes/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../store/slices/cartSlice";

const Products = (props) => {
  const { filters, sorting } = props;
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleGetProducts = async () => {
    try {
      const response = await getProducts(filters, sorting);
      setProducts(response.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addProductToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      dispatch(updateCart({ id: product.id, quantity: existingProduct.quantity + 1 }));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters, sorting]);

  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h2 className="product-title">{product.title}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <button
              className="add-to-cart"
              onClick={() => addProductToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;

