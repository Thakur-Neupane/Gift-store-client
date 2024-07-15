import {
  deleteCategory,
  getAllCategories,
  postNewCategory,
  updateCategory,
} from "./catAxios";
import { setCats } from "./catSlice";

// Create new category action
export const createNewCategoryAction = (catData) => async (dispatch) => {
  try {
    const response = await postNewCategory(catData);

    if (response.status === "success") {
      dispatch(getCategoryAction()); // Refresh categories after insert
      return true;
    }
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Get all categories action
export const getCategoryAction = () => async (dispatch) => {
  try {
    const response = await getAllCategories();

    if (response.status === "success") {
      dispatch(setCats(response.categories));
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Update category action
export const updateCategoryAction = (slug, category) => async (dispatch) => {
  try {
    const response = await updateCategory(slug, category);

    if (response.status === "success") {
      dispatch(getCategoryAction());
      return true;
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete category action
export const deleteCategoryAction = (slug) => async (dispatch) => {
  try {
    const response = await deleteCategory(slug);

    if (response.status === "success") {
      dispatch(getCategoryAction()); // Refresh categories after delete
    }
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
