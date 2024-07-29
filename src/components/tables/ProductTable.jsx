import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductAction,
  deleteProductAction,
} from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";
import LocalSearch from "../forms/LocalSearch";
import EditProduct from "../forms/EditProduct";
import NewProduct from "../../pages/product/NewProduct";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export const ProductTable = () => {
  const [displayProd, setDisplayProd] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

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

  const getParentCategoryTitle = (parentId) => {
    const parentCat = cats.find((cat) => cat._id === parentId);
    return parentCat ? parentCat.title : "N/A";
  };

  const getSubCategoryTitle = (prod, subCats) => {
    if (
      !subCats ||
      subCats.length === 0 ||
      !prod.subCategories ||
      prod.subCategories.length === 0
    ) {
      return "N/A";
    }

    const subCategoryTitles = prod.subCategories.map((subCatId) => {
      const subCat = subCats.find((sc) => sc._id === subCatId);
      return subCat ? subCat.title : "N/A";
    });

    return subCategoryTitles.join(", ");
  };

  useEffect(() => {
    let filteredProducts = products;

    if (keyword) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.category === categoryFilter
      );
    }

    if (subCategoryFilter) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.subCategories.includes(subCategoryFilter)
      );
    }

    setDisplayProd(filteredProducts);
  }, [products, keyword, categoryFilter, subCategoryFilter, subCats]);

  const handleOnEdit = (product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAction(id)).then(() => {
        dispatch(getProductAction());
      });
    }
  };

  const productsFound = displayProd.length;

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === 1}>
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
            type="products"
          />
        </div>
      </div>

      <Button
        className="mb-2"
        variant="primary"
        onClick={() => setShowAddProduct(true)}
      >
        <FaPlus /> Add New Product
      </Button>

      {showAddProduct && (
        <AddNewProduct
          setShow={setShowAddProduct}
          selectedProduct={selectedProduct}
          isFromProductTable={false}
        />
      )}

      {showEditProduct && (
        <EditProduct
          selectedProduct={selectedProduct}
          setShow={setShowEditProduct}
        />
      )}

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
            <th>Actions</th>
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
              <td>{getSubCategoryTitle(prod, subCats)}</td>
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
                <Button
                  onClick={() => handleOnEdit(prod)}
                  variant="warning"
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button onClick={() => handleDelete(prod._id)} variant="danger">
                  <FaTrash />
                </Button>
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
