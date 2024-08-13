import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  getCategorySubsAction,
} from "../../features/categories/catAction";
import { Link } from "react-router-dom";
import { createNewProductAction } from "../../features/products/productAction";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";

const NewProduct = () => {
  const { form, setForm, handleOnChange } = useForm({
    category: "",
    subCatId: "",
    name: "",
    sku: "",
    qty: "",
    price: "",
    salesPrice: "",
    salesStart: "",
    salesEnd: "",
    description: "",
    thumbnail: "",
    shipping: "",
    color: "",
    brand: "",
  });

  const dispatch = useDispatch();
  const cats = useSelector((state) => state.catInfo.cats);
  const subCats = useSelector((state) => state.subCatInfo.subCats);

  useEffect(() => {
    if (!cats.length) {
      dispatch(getCategoryAction());
    }
  }, [dispatch, cats]);

  useEffect(() => {
    if (form.category) {
      dispatch(getCategorySubsAction(form.category));
    }
  }, [form.category, dispatch]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setForm({ ...form, category, subCatId: "" }); // Reset subCatId when category changes
    if (category) {
      dispatch(getCategorySubsAction(category));
    }
  };

  const handleSubCatChange = (e) => {
    const subCatId = e.target.value;
    setForm({ ...form, subCatId });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...form,
      subCategories: form.subCatId ? [form.subCatId] : [], // Ensure it's an array
    };
    dispatch(createNewProductAction(formData));
    setForm({
      category: "",
      subCatId: "",
      name: "",
      sku: "",
      qty: "",
      price: "",
      salesPrice: "",
      salesStart: "",
      salesEnd: "",
      description: "",
      thumbnail: "",
      shipping: "",
      color: "",
      brand: "",
    });
  };

  const catOptions = cats
    .filter((p) => p.status === "active")
    .map(({ title, _id }) => ({
      text: title,
      value: _id,
    }));

  const subCatOptions = subCats
    .filter((sub) => sub.parent === form.category)
    .map(({ title, _id }) => ({
      text: title,
      value: _id,
    }));

  const inputs = [
    {
      label: "Category",
      name: "category",
      type: "text",
      required: true,
      isSelectType: true,
      options: catOptions,
      onChange: handleCategoryChange,
    },
    {
      label: "Sub-Category",
      name: "subCatId",
      type: "text",
      required: true,
      isSelectType: true,
      options: subCatOptions,
      onChange: handleSubCatChange,
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
      label: "Description",
      name: "description",
      type: "text",
      as: "textarea",
      maxLength: 2000,
      rows: 10,
      required: true,
      placeholder: "Write product details",
    },
    {
      label: "Thumbnail",
      name: "thumbnail",
      type: "text",
      placeholder: "Enter URL of product thumbnail",
    },
    {
      label: "Shipping",
      name: "shipping",
      type: "text",
      placeholder: "Yes or No",
    },
    {
      label: "Color",
      name: "color",
      type: "text",
      placeholder: "Product color",
    },
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Product brand",
    },
  ];

  return (
    <div>
      <h2>Create new product</h2>
      <hr />
      <Link to="/admin/products">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <Form onSubmit={handleOnSubmit}>
        {inputs.map((item, i) => {
          return item.isSelectType ? (
            <CustomSelect
              key={i}
              {...item}
              onChange={
                item.name === "subCatId"
                  ? handleSubCatChange
                  : handleCategoryChange
              }
              options={item.name === "subCatId" ? subCatOptions : item.options}
            />
          ) : (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          );
        })}
        <Form.Group controlId="formImages">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <div className="d-grid mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewProduct;
