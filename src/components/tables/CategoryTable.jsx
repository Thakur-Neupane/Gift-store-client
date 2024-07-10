import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../features/categories/catAction";
import { EditCategory } from "../forms/EditCategor";
import { setShowModal } from "../../store/systemSlice";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState({});

  const { cats } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedCat(obj);
    dispatch(setShowModal(true));
  };
  return (
    <div>
      {selectedCat?._id && <EditCategory selectedCat={selectedCat} />}
      <div className="">5 Categories found</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {cats.map(({ _id, status, title, slug }, i) => (
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
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
