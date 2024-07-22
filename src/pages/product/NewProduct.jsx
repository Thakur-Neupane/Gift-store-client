import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../features/categories/catAction";
import { getAllSubCategories } from "../../features/subcategories/subCatAxios";
import { Link } from "react-router-dom";
import {
  createNewProductAction,
  getProductAction,
} from "../../features/products/productAction";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { CustomSelect } from "../../components/common/custom-input/CustomInput";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { form, handleOnChange } = useForm();
  const { cats } = useSelector((state) => state.catInfo);
  const { subCats } = useSelector((state) => state.subCatInfo);
  console.log(subCats);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    dispatch(getCategoryAction());
    dispatch(getProductAction());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      console.log(`Fetching subcategories for category: ${selectedCategory}`);
      getSubCategoryOptions(selectedCategory);
    } else {
      console.log("No category selected. Clearing subcategory options.");
      setSubCategoryOptions([]);
    }
  }, [selectedCategory]);

  const getSubCategoryOptions = async (parentCatId) => {
    try {
      const response = await getAllSubCategories();
      if (response && response.data) {
        const subCategories = response.data.filter(
          (subCat) => subCat.parentCatId === parentCatId
        );
        const options = subCategories.map(({ _id, title }) => ({
          text: title,
          value: _id,
        }));
        setSubCategoryOptions(options);
      } else {
        console.error("Error fetching subcategories:", response);
        setSubCategoryOptions([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategoryOptions([]);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      sold: parseInt(form.sold, 10) || 0,
      subCategoryId: form.subCategoryId,
    };

    dispatch(createNewProductAction(formData))
      .then(() => {
        console.log("Product created successfully.");
        dispatch(getProductAction());
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedCatId = e.target.value;
    setSelectedCategory(selectedCatId);
    handleOnChange(e);
  };

  const categoryOptions = cats
    .filter((cat) => cat.status === "active")
    .map(({ title, _id }) => ({ text: title, value: _id }));

  const inputs = [
    {
      label: "Category",
      name: "parentCatId",
      type: "text",
      required: true,
      isSelectType: true,
      options: categoryOptions,
      onChange: handleCategoryChange,
    },
    {
      label: "Subcategory",
      name: "subCategoryId",
      type: "text",
      required: true,
      isSelectType: true,
      options: subCategoryOptions,
    },
    {
      label: "Shipping",
      name: "shipping",
      type: "text",
      placeholder: "Yes or No",
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
