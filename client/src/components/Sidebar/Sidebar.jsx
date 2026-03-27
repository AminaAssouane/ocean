import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <NavLink to="/dashboard">Home</NavLink>
      <NavLink to="/dashboard/profile">Profile</NavLink>
      <NavLink to="/dashboard/create">Create</NavLink>
      <NavLink to="/dashboard/users">Users</NavLink>
      <NavLink to="/dashboard/liked">Likes</NavLink>
      <NavLink>Logout</NavLink>
    </aside>
  );
}
