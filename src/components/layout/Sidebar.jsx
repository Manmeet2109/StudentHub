import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/students">Students</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;