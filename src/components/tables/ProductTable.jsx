import React, { useEffect, useState } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductAction } from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";

export const ProductTable = () => {
  const [displayProd, setDisplayProd] = useState([]);
  const { products } = useSelector((state) => state.productInfo);
  const { cats } = useSelector((state) => state.catInfo); // Retrieve categories from Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction());
    dispatch(getCategoryAction()); // Fetch products and categories
  }, [dispatch]);

  useEffect(() => {
    setDisplayProd(products);
  }, [products]);

  let active = 2; // Placeholder for active pagination item
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  // Function to get parent category title from ID
  const getParentCategoryTitle = (parentId) => {
    const parentCat = cats.find((cat) => cat._id === parentId);
    return parentCat ? parentCat.title : "N/A";
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>{products.length} Products Found</div>
        <div>
          <Form.Control placeholder="Search by name..." />
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
              <td>{getParentCategoryTitle(prod.category)}</td>{" "}
              <td>{prod.subCategory}</td>
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
              <td>{prod.color}</td> {/* Display color field */}
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
