import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { createNewSubCategoryAction } from "../../features/subcategories/subCatAction";
import useForm from "../../Hooks/useForm";

const AddNewSubCategory = ({ setShow, selectedCat }) => {
  const { form, setForm, handleOnChange } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCat && selectedCat._id) {
      setForm({ parentCatId: selectedCat._id, title: "" });
    }
  }, [selectedCat, setForm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await dispatch(
      createNewSubCategoryAction({
        title: form.title,
        parentCatId: form.parentCatId,
      })
    );

    if (isSuccess) setShow(false);
  };

  return (
    <Modal show={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Sub-Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group>
            <Form.Label>Parent Category</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={selectedCat ? selectedCat.title : ""}
            />
          </Form.Group>
          <CustomInput
            label="Sub-Category"
            name="title"
            type="text"
            required
            placeholder="Sub-Category"
            onChange={handleOnChange}
          />
          <input
            type="hidden"
            name="parentCatId"
            value={selectedCat ? selectedCat._id : ""}
          />
          <div className="d-grid mt-3">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewSubCategory;
