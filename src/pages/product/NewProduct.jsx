import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../features/categories/catAction";
import { Link } from "react-router-dom";
import {
  createNewProductAction,
  getProductAction,
} from "../../features/products/productAction";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { CustomSelect } from "../../components/common/custom-input/CustomInput";

const NewProduct = () => {
  const { form, setForm, handleOnChange } = useForm();
  const { cats } = useSelector((state) => state.catInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cats.length) {
      dispatch(getCategoryAction());
    }
    dispatch(getProductAction()); // Fetch products on mount
  }, [cats, dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      sold: parseInt(form.sold, 10) || 0,
      category: form.parentCatId,
    };

    dispatch(createNewProductAction(formData))
      .then(() => {
        // After successful creation, fetch products again to update the list
        dispatch(getProductAction());
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        // Handle error if needed
      });
  };

  const options = cats
    .filter((p) => p.status === "active")
    .map(({ title, _id }) => {
      return { text: title, value: _id };
    });

  const inputs = [
    {
      label: "Category ",
      name: "parentCatId",
      type: "text",
      required: true,
      isSelectType: true,
      options,
    },
    {
      label: "Shipping",
      name: "shipping",
      type: "text",
      placeholder: "Yes or NO",
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      placeholder: "Phones",
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      required: true,
      placeholder: "DJK-H9879",
    },
    {
      label: "Qty",
      name: "qty",
      type: "number",
      min: 1,
      required: true,
      placeholder: "22",
    },
    {
      label: "Sold",
      name: "sold",
      type: "number",
      placeholder: "0",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      min: 1,
      required: true,
      placeholder: "234",
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      min: 1,
      placeholder: "22",
    },
    {
      label: "Sales Start Date",
      name: "salesStart",
      type: "date",
    },
    {
      label: "Sales End Date",
      name: "salesEnd",
      type: "date",
    },
    {
      label: "Thumbnail",
      name: "thumbnail",
      type: "text",
      placeholder: "URL",
    },
    {
      label: "Color",
      name: "color",
      type: "text",
      placeholder: "Color",
    },
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Brand",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      as: "textarea",
      maxLength: 5000,
      rows: 10,
      required: true,
      placeholder: "Write product details",
    },
  ];

  return (
    <div>
      <h2>Create new product</h2>
      <hr />

      <Link to="/admin/products">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <Form onSubmit={handleOnSubmit} encType="multipart/form-data">
        {inputs.map((item, i) =>
          item.isSelectType ? (
            <CustomSelect key={i} {...item} onChange={handleOnChange} />
          ) : (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          )
        )}

        <Form.Group>
          <Form.Label>Upload Images</Form.Label>

          <Form.Control
            type="file"
            name="images"
            accept="image/jpg, image/png, image/gif, image/jpeg"
            multiple
          />
        </Form.Group>

        <div className="d-grid mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewProduct;
