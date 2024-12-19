/*import { sortingOptions } from "../constants/sort";
import { getDummyApiUrl } from "../utils/envUtils";

export const getProductCategories = async () => {
  const result = await fetch(`${getDummyApiUrl()}/products/categories`);
  const response = await result.json();
  return response;
};

export const getProducts = async (filters, sortingId) => {
  let url = `${getDummyApiUrl()}/products`;

  if (filters.category) {
    url += `/category/${filters.category}`;
  }

  if (sortingId) {
    const sortOption = sortingOptions.find((option) => option.id === sortingId);

    if (sortOption) {
      url += `?sortBy=${sortOption.key}&order=${sortOption.order}`;
    }
  }

  const result = await fetch(url);
  const response = await result.json();

  return response;
};
*/

import { sortingOptions } from "../constants/sort";
import { getDummyApiUrl } from "../utils/envUtils";

export const getProductCategories = async () => {
  const result = await fetch(`${getDummyApiUrl()}/products/categories`);
  const response = await result.json();
  return response;
};

export const getProducts = async (filters, sortingId) => {
  const predefinedCategories = [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  let urls = [];

  // Construim URL-urile pentru categoriile predefinite sau filtrul selectat
  if (filters.category) {
    urls.push(`${getDummyApiUrl()}/products/category/${filters.category}`);
  } else {
    urls = predefinedCategories.map(
      (category) => `${getDummyApiUrl()}/products/category/${category}`
    );
  }

  // Adăugăm sortarea dacă există
  if (sortingId) {
    const sortOption = sortingOptions.find((option) => option.id === sortingId);
    if (sortOption) {
      urls = urls.map((url) => `${url}?sortBy=${sortOption.key}&order=${sortOption.order}`);
    }
  }

  try {
    console.log("Fetching URLs:", urls); // Debugging URLs
    const fetchPromises = urls.map((url) => fetch(url).then((res) => res.json()));
    const responses = await Promise.all(fetchPromises);

    // Combinăm produsele din toate răspunsurile
    const allProducts = responses.flatMap((response) => response.products || []);
    return { products: allProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
};

