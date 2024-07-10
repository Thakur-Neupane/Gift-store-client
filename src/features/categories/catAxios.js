import { apiProcessor } from "../../services/axios";
const catEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/categories";

export const postNewCategory = (data) => {
  const obj = {
    url: catEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

export const getAllCategories = () => {
  const obj = {
    url: catEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};
