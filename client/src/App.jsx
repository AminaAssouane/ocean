import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./App.css";
export default function App({ router }) {
  return (
    <UserProvider>
      <RouterProvider router={router} />{" "}
    </UserProvider>
  );
}
