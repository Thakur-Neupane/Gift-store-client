import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategoryAction,
  deleteSubCategoryAction,
} from "../../features/subcategories/subCatAction";
import EditSubCategory from "../forms/EditSubCategory";
import { setShowModal } from "../../store/systemSlice";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import LocalSearch from "../forms/LocalSearch";
import AddNewSubCategory from "../forms/AddNewSubCategory";

const SubCategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedSubCat, setSelectedSubCat] = useState({});
  const [keyword, setKeyword] = useState("");
  const [showAddSubCat, setShowAddSubCat] = useState(false);
  const [showEditSubCat, setShowEditSubCat] = useState(false);
  const { subCats } = useSelector((state) => state.subCatInfo);
  const { cats } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getSubCategoryAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedSubCat(obj);
    setShowEditSubCat(true);
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this sub-category?")) {
      dispatch(deleteSubCategoryAction(slug)).then(() => {
        dispatch(getSubCategoryAction());
      });
    }
  };

  const searched = (keyword) => (item) =>
    item.title.toLowerCase().includes(keyword);

  const getParentCategoryTitle = (parentId) => {
    const parentCat = cats.find((cat) => cat._id === parentId);
    return parentCat ? parentCat.title : "N/A";
  };

  const getRowClass = (status) => {
    return status === "active" ? "table-success" : "table-danger";
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <h2 className="me-auto">We have {subCats.length} Sub-Categories!</h2>
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      </div>

      <Button
        variant="primary"
        onClick={() => setShowAddSubCat(true)}
        hidden={subCats.some((subCat) => subCat.status === "inactive")}
      >
        <FaPlus /> Add New Sub-Category
      </Button>

      {showAddSubCat && (
        <AddNewSubCategory
          setShow={setShowAddSubCat}
          selectedCat={selectedSubCat}
        />
      )}

      {showEditSubCat && (
        <EditSubCategory
          selectedCat={selectedSubCat}
          setShow={setShowEditSubCat}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Parent Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCats
            .filter(searched(keyword))
            .map(({ _id, status, title, slug, parent }, i) => (
              <tr key={_id} className={getRowClass(status)}>
                <td>{i + 1}</td>
                <td>{status}</td>
                <td>{title}</td>
                <td>{slug}</td>
                <td>{getParentCategoryTitle(parent)}</td>
                <td>
                  <Button
                    onClick={() =>
                      handleOnEdit({ _id, status, title, slug, parent })
                    }
                    variant="warning"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDelete(slug)}
                    variant="danger"
                    className="ms-2"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default SubCategoryTable;
