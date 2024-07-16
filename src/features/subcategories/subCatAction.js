import {
  deleteSubCategory,
  getAllSubCategories,
  postNewSubCategory,
  updateSubCategory,
} from "./subCatAxios";
import { setSubCats } from "./subCatSlice";

// Create new sub-category action
export const createNewSubCategoryAction = (subCatData) => async (dispatch) => {
  try {
    const response = await postNewSubCategory(subCatData);

    if (response.status === "success") {
      dispatch(getSubCategoryAction());
      return true;
    }
  } catch (error) {
    console.error("Error creating Sub-category:", error);
  }
};

// Get all sub-categories action
export const getSubCategoryAction = () => async (dispatch) => {
  try {
    const response = await getAllSubCategories();

    if (response.status === "success") {
      dispatch(setSubCats(response.categories));
    }
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
  }
};

export const updateSubCategoryAction = (slug, category) => async (dispatch) => {
  try {
    const response = await updateSubCategory(slug, category);

    if (response.status === "success") {
      dispatch(getSubCategoryAction());
      return true;
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete subcategory action
export const deleteSubCategoryAction = (slug) => async (dispatch) => {
  try {
    const response = await deleteSubCategory(slug);

    if (response.status === "success") {
      dispatch(getSubCategoryAction()); // Refresh subcategories after delete
      return true; // Indicate success
    }
  } catch (error) {
    console.error("Error deleting subcategory:", error);
  }
};
