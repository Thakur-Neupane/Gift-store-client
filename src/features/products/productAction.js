import { getAllProducts, postNewProduct } from "./productAxios";
import { setProducts } from "./productSlice";

export const createNewProductAction = (productData) => async (dispatch) => {
  try {
    await postNewProduct(productData);
    dispatch(getProductAction());
  } catch (error) {
    console.error("Error creating new product:", error);
  }
};

export const getProductAction = () => async (dispatch) => {
  const response = await getAllProducts();

  if (response.status === "success") {
    dispatch(setProducts(response.products));
  }
};
