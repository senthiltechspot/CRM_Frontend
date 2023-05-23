import {
  CSidebar,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CSidebarToggler,
} from "@coreui/react";
import { Link } from "react-router-dom";
import HandeLogout from "../handlers/HandeLogout";

const Sidebar = () => {
  return (
    <CSidebar unfoldable className="vh-100 bg-black">
      <CSidebarNav>
        <CNavItem href="/" className="bg-dark">
          <i className="bi bi-bar-chart-fill text-white m-2"></i>
        </CNavItem>

        <CNavTitle className="text-light fw-normal">
          A CRM Application
        </CNavTitle>

        <CNavItem href="/">
          <i className="bi bi-house text-white m-2"></i>

          <Link to="/admin" className="text-decoration-none text-white mx-3">
            Home
          </Link>
        </CNavItem>

        <div onClick={HandeLogout}>
          <CNavItem href="/">
            <i className="bi bi-box-arrow-left text-white m-2"></i>
            <div className="text-decoration-none text-white mx-3">Logout</div>
          </CNavItem>
        </div>
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
  );
};

export default Sidebar;
