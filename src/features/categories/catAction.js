import { setShowModal } from "../../store/systemSlice";
import { getAllCategories, postNewCategory } from "./catAxios";
import { setCats } from "./catSlice";

export const createNewCategoryAction = (catData) => async (dispatch) => {
  const response = await postNewCategory(catData);

  if (response.status === "success") {
    dispatch(getCategoryAction());
    return true;
  }
};

export const getCategoryAction = () => async (dispatch) => {
  const response = await getAllCategories();

  if (response.status === "success") {
    dispatch(setCats(response.categories));
  }
};
