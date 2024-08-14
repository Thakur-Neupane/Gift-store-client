import { apiProcessor } from "../../services/axios";

const productEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/products";

// Function to create a new product
export const postNewProduct = (data) => {
  const obj = {
    url: productEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Function to get all products
export const getAllProducts = () => {
  const obj = {
    url: productEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Function to get a single product by slug
export const getOneProduct = (slug) => {
  const obj = {
    url: `${productEP}/${slug}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Function to delete a product
export const deleteProduct = (slug) => {
  const obj = {
    url: `${productEP}/${slug}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Function to update a product
export const updateProduct = (slug, data) => {
  const obj = {
    url: `${productEP}/${slug}`,
    method: "put",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};
