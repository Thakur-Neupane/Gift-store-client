import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const [displayProd, setDisplayProd] = useState([]);
  const { products } = useSelector((state) => state.productInfo);

  useEffect(() => {
    setDisplayProd(products);
  }, []);

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
        <div>30 Products Found</div>
        <div>
          <Form.Control placeholder="Search by name..." />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Sales Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {displayProd.map((prod, i) => (
            <tr key={prod._id}>
              <td>{1 + i}</td>
              <td>
                <img src={prod.thumbnail} width="70px" alt="" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.qty}</td>
              <td>
                ${prod.salesPrice}
                <br />
                {prod.salesStart?.slice(0, 10)} To {prod.salesEnd?.slice(0, 10)}
              </td>
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
