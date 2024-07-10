import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Stack gap={1}>
      <div className="p-2">
        <Link className="nav-link" to="/admin/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/admin/categories">
          Categories
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/admin/products">
          Products
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/admin/users">
          Users
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/admin/orders">
          Orders
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/admin/reviews">
          Reviews
        </Link>
      </div>
      <hr />
      <div className="p-2">
        <Link className="nav-link" to="/admin/admins">
          Admins
        </Link>
      </div>
    </Stack>
  );
};
