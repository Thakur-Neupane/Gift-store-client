import { apiProcessor } from "../../services/axios";
const catEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/sub-categories";

// Post new subcategory
export const postNewSubCategory = (data) => {
  const obj = {
    url: catEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Get all sub-categories
export const getAllSubCategories = () => {
  const obj = {
    url: catEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Delete subcategory by slug
export const deleteSubCategory = (slug) => {
  const obj = {
    url: `${catEP}/${slug}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Update subcategory by slug
export const updateSubCategory = async (slug, subcategory) => {
  const obj = {
    url: `${catEP}/${slug}`,
    method: "put",
    data: subcategory,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};
