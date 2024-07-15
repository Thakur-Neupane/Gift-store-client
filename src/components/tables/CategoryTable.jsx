import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  deleteCategoryAction,
} from "../../features/categories/catAction";
import { EditCategory } from "../forms/EditCategor";
import { setShowModal } from "../../store/systemSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import LocalSearch from "../forms/LocalSearch";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState({});
  const [keyword, setKeyword] = useState("");
  const { cats } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedCat(obj);
    dispatch(setShowModal(true));
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(slug)).then(() => {
        dispatch(getCategoryAction());
      });
    }
  };

  const searched = (keyword) => (item) =>
    item.title.toLowerCase().includes(keyword);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        {selectedCat?._id && (
          <div className="me-3">
            <EditCategory selectedCat={selectedCat} />
          </div>
        )}
        <h2 className="me-auto">We have {cats.length} Categories!</h2>

        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats
            .filter(searched(keyword))
            .map(({ _id, status, title, slug }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>{status}</td>
                <td>{title}</td>
                <td>{slug}</td>
                <td>
                  <Button
                    onClick={() => handleOnEdit({ _id, status, title, slug })}
                    variant="warning"
                  >
                    <FaEdit /> {/* Edit Icon */}
                  </Button>
                  <Button
                    onClick={() => handleDelete(slug)}
                    variant="danger"
                    className="ms-2"
                  >
                    <FaTrash /> {/* Delete Icon */}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
