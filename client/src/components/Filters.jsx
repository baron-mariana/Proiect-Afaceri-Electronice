/*import { useEffect, useState } from "react";
import { getProductCategories } from "../routes/products";

const Filters = (props) => {
  const { setFilters } = props;
  const [categories, setCategories] = useState([]);

  const handleGetProductCategories = async () => {
    const response = await getProductCategories();
    setCategories(response);
  };

  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  useEffect(() => {
    if (!categories.length) {
      handleGetProductCategories();
    }
  }, []);

  return (
    <div className="filtersWrapper">
      <div>
        <label htmlFor="categorySelect">Category</label>
      </div>
      <div>
        <select id="categorySelect" onChange={handleCategoryChange}>
          {categories?.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;*/

import { useEffect } from "react";

const Filters = (props) => {
  const { setFilters } = props;

  const predefinedCategories = [
    { slug: "mens-shirts", name: "Men's Shirts" },
    { slug: "mens-shoes", name: "Men's Shoes" },
    { slug: "mens-watches", name: "Men's Watches" },
    { slug: "tops", name: "Tops" },
    { slug: "womens-bags", name: "Women's Bags" },
    { slug: "womens-dresses", name: "Women's Dresses" },
    { slug: "womens-jewellery", name: "Women's Jewellery" },
    { slug: "womens-shoes", name: "Women's Shoes" },
    { slug: "womens-watches", name: "Women's Watches" },
  ];

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    console.log("Categoria selectată:", selectedCategory); // Debugging
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: selectedCategory,
    }));
  };

  return (
    <div className="filtersWrapper">
      <label htmlFor="categorySelect">Category</label>
      <select id="categorySelect" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {predefinedCategories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;

