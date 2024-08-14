import {
  getAllProducts,
  postNewProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
} from "./productAxios";
import { setProducts, setProduct } from "./productSlice";

// Action to create a new product
export const createNewProductAction = (productData) => async (dispatch) => {
  try {
    await postNewProduct(productData);
    dispatch(getProductAction());
  } catch (error) {
    console.error("Error creating new product:", error);
  }
};

// Action to get all products
export const getProductAction = () => async (dispatch) => {
  try {
    const response = await getAllProducts();
    if (response.status === "success") {
      dispatch(setProducts(response.products));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Action to delete a product
export const deleteProductAction = (_id) => async (dispatch) => {
  try {
    const response = await deleteProduct(_id);
    if (response.status === "success") {
      dispatch(getProductAction()); // Refresh the product list
    } else {
      console.error("Error deleting product:", response.message);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

// Action to get a single product by id
export const getOneProductAction = (id) => async (dispatch) => {
  try {
    const response = await getOneProduct(id);
    if (response.status === "success") {
      dispatch(setProduct(response.product));
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Action to update a product
export const updateProductAction = (slug, productData) => async (dispatch) => {
  try {
    await updateProduct(slug, productData);
    dispatch(getProductAction()); // Refresh product list after update
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
