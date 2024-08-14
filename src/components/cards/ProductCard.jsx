import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={product.thumbnail || "/placeholder.png"} // Use thumbnail or placeholder
        style={{ height: "200px", objectFit: "cover" }}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </Card.Text>
        <Link to={`/product/${product.slug}`}>
          <Button variant="primary">View Details</Button>
        </Link>
        <Button variant="danger" onClick={handleDelete} className="ms-2">
          <FaTrashAlt />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
