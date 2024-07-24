// ProductTable.jsx

import React, { useEffect, useState } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductAction } from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";
import LocalSearch from "../forms/LocalSearch";
export const ProductTable = () => {
  const [displayProd, setDisplayProd] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const { products } = useSelector((state) => state.productInfo);
  const { cats } = useSelector((state) => state.catInfo);
  const { subCats } = useSelector((state) => state.subCatInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction());
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    setDisplayProd(products);
  }, [products]);

  // Function to get parent category title from ID
  const getParentCategoryTitle = (parentId) => {
    const parentCat = cats.find((cat) => cat._id === parentId);
    return parentCat ? parentCat.title : "N/A";
  };

  // Function to get subcategory title from ID
  const getSubCategoryTitle = (subCatId) => {
    const subCat = subCats.find((subCat) => subCat._id === subCatId);
    return subCat ? subCat.title : "N/A";
  };

  // Filter products based on search keyword, category filter, and subcategory filter
  useEffect(() => {
    let filteredProducts = products;

    if (keyword) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(keyword)
      );
    }

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.category === categoryFilter
      );
    }

    if (subCategoryFilter) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.subCategories === subCategoryFilter
      );
    }

    setDisplayProd(filteredProducts);
  }, [products, keyword, categoryFilter, subCategoryFilter]);

  // Calculate the count of products found based on filtered products
  const productsFound = displayProd.length;

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>{productsFound} Products Found</div>
        <div>
          <LocalSearch
            keyword={keyword}
            setKeyword={setKeyword}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            subCategoryFilter={subCategoryFilter}
            setSubCategoryFilter={setSubCategoryFilter}
            categories={cats}
            subCategories={subCats}
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Slug</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Sales Price</th>
            <th>Color</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {displayProd.map((prod, index) => (
            <tr
              key={prod._id}
              className={
                prod.status === "active" ? "table-success" : "table-danger"
              }
            >
              <td>{index + 1}</td>
              <td>{prod.status === "active" ? "Active" : "Inactive"}</td>
              <td>
                <img src={prod.thumbnail} width="70px" alt="" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.slug}</td>
              <td>{prod.sku}</td>
              <td>{getParentCategoryTitle(prod.category)}</td>
              <td>{getSubCategoryTitle(prod.subCategories)}</td>
              <td>
                {prod.description.length > 50
                  ? `${prod.description.slice(0, 50)}...`
                  : prod.description}
              </td>
              <td>{prod.price}</td>
              <td>{prod.qty}</td>
              <td>
                ${prod.salesPrice}
                {prod.salesStart && prod.salesEnd ? (
                  <div>
                    <hr />
                    {prod.salesStart.slice(0, 10)} to <hr />
                    {prod.salesEnd.slice(0, 10)}
                    <hr />
                  </div>
                ) : null}
              </td>
              <td>{prod.color}</td>
              <td>
                <Link to={`/admin/product/edit/${prod._id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};

export default ProductTable;
