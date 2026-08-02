import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/students">
        Students
      </NavLink>
      <NavLink to="/students/add">
        Add Student
      </NavLink>
    </nav>
  );
}

export default Sidebar;