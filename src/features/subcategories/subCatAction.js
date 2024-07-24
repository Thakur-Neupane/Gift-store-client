import {
  getAllSubCategories,
  postNewSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoriesByParentCatId,
} from "./subCatAxios";
import { setSubCats } from "./subCatSlice";

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

// Create new sub-category action
export const createNewSubCategoryAction = (subCatData) => async (dispatch) => {
  try {
    const response = await postNewSubCategory(subCatData);

    if (response.status === "success") {
      dispatch(getSubCategoryAction()); // Refresh subcategories after insert
      return true;
    }
  } catch (error) {
    console.error("Error creating Sub-category:", error);
  }
};

// Update sub-category action
export const updateSubCategoryAction =
  (slug, subcategory) => async (dispatch) => {
    try {
      const response = await updateSubCategory(slug, subcategory);

      if (response.status === "success") {
        dispatch(getSubCategoryAction()); // Refresh subcategories after update
        return true;
      }
    } catch (error) {
      console.error("Error updating sub-category:", error);
    }
  };

// Delete sub-category action
export const deleteSubCategoryAction = (slug) => async (dispatch) => {
  try {
    const response = await deleteSubCategory(slug);

    if (response.status === "success") {
      dispatch(getSubCategoryAction()); // Refresh subcategories after delete
      return true;
    }
  } catch (error) {
    console.error("Error deleting sub-category:", error);
  }
};

// Get all sub-categories action by parent category id

export const getSubCategoryActionByParentCatId =
  (parentCatId) => async (dispatch) => {
    try {
      const response = await getAllSubCategoriesByParentCatId(parentCatId);

      if (response.status === "success") {
        dispatch(setSubCats(response.subCategories));
      }
    } catch (error) {
      console.error("Error fetching sub-categories by parent category:", error);
    }
  };
