import { apiProcessor } from "../../services/axios";
const productEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/products";

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

export const getAllProducts = () => {
  const obj = {
    url: productEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};
