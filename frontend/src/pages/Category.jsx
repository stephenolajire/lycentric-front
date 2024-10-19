import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../css/Category.module.css";
import api from "../constant/api";
import { GlobalContext } from "../context/GlobalContext";
import NavCategory from "../components/NavCategory";

const Category = () => {
  const { audience, fetchAudience } = useContext(GlobalContext);
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState([]);

  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const response = await api.get("category");
    try {
      if (response) {
        console.log(response.data);
        setCategory(response.data);
      } else {
        console.log(response.error);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchData = async (
    url = `https://lycentric-backend.onrender.com/category/${categoryId}`
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
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    fetchAudience();
  }, []);

  return (
    <section>
      <div className={styles.catList}>
        {category.map((cat) => (
          <NavCategory category={cat} key={cat.id} />
        ))}
      </div>
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
            onClick={() => fetchData(pagination.previous)}
            className={styles.prevBtn}
          >
            Previous
          </button>
        )}

        {/* Only show "Next" button if there is a next page */}
        {pagination.next && (
          <button
            onClick={() => fetchData(pagination.next)}
            className={styles.nextBtn}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Category;
