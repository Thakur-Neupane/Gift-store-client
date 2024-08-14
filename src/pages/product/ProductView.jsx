import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductAction } from "../../features/products/productAction";

const ProductView = () => {
  const { _id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const product = useSelector((state) => state.productInfo.product);
  const loading = useSelector((state) => state.productInfo.loading);
  const errorFromRedux = useSelector((state) => state.productInfo.error);

  useEffect(() => {
    if (_id) {
      dispatch(getOneProductAction(_id));
    }
  }, [_id, dispatch]);

  useEffect(() => {
    if (errorFromRedux) {
      setError(errorFromRedux);
    }
  }, [errorFromRedux]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Product Details</h2>
      {product ? (
        <Row>
          <Col md={6}>
            <Carousel>
              {product.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${index}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6}>
            <h3>{product.name}</h3>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            {product.salesPrice && (
              <p>
                <strong>Sales Price:</strong> ${product.salesPrice}
              </p>
            )}
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Sub-Category:</strong> {product.subCategories.join(", ")}
            </p>
            <p>
              <strong>Quantity:</strong> {product.qty}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shipping}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Sales Period:</strong>{" "}
              {product.salesStart
                ? `${new Date(
                    product.salesStart
                  ).toLocaleDateString()} - ${new Date(
                    product.salesEnd
                  ).toLocaleDateString()}`
                : "N/A"}
            </p>
            <Button
              variant="primary"
              onClick={() => alert("Add to Cart functionality here")}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      ) : (
        <Alert variant="info">Product not found</Alert>
      )}
    </Container>
  );
};

export default ProductView;
