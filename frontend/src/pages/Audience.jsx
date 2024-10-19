import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/Card";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "../css/Category.module.css";
import api from "../constant/api";
import { GlobalContext } from "../context/GlobalContext";

const Audience = () => {
  const { categoryId, audienceId } = useParams(); // Capture both params
  const [products, setProducts] = useState([]);

  const { audience, fetchAudience } = useContext(GlobalContext);
  const [pagination, setPagination] = useState({ next: null, previous: null });

  const fetchProducts = async (
    url = `https://lycentric-backend.onrender.com/products/${categoryId}/${audienceId}`
  ) => {
    try {
      const response = await axios.get(url);
      if (response) {
        setProducts(response.data.results); // Update products with the results
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
        }); // Update pagination URLs
      } else {
        console.error("Error: No response data");
      }
    } catch (err) {
      console.error("Error fetching product data:", err.message);
    }
  };

  useEffect(() => {
    fetchAudience();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, audienceId]);

  return (
    <section>
      <div className={styles.flex}>
        <Link to={`/category/${categoryId}`}>
          <h3 className={styles.all}>All Products</h3>
        </Link>
        <div className={styles.buttonCat}>
          {audience.map((item) => (
            <Link
              key={item.id}
              to={`/category/${categoryId}/audience/${item.id}`}
            >
              <button key={item.id}>{item.name}</button>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {products.length === 0 ? (
          <div className={styles.item}>No items are available</div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.paginationControls}>
        {/* Only show "Previous" button if there is a previous page */}
        {pagination.previous && (
          <button
            onClick={() => fetchProducts(pagination.previous)}
            className={styles.prevBtn}
          >
            Previous
          </button>
        )}

        {/* Only show "Next" button if there is a next page */}
        {pagination.next && (
          <button
            onClick={() => fetchProducts(pagination.next)}
            className={styles.nextBtn}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Audience;
