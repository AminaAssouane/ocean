import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import Post from "./pages/Post/Post.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import Users from "./pages/Users/Users.jsx";
import Likes from "./pages/Likes/Likes.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "post/:postId", element: <Post /> },
      { path: "profile", element: <Profile /> },
      { path: "create", element: <CreatePost /> },
      { path: "users/:userId", element: <UserProfile /> },
      { path: "users", element: <Users /> },
      { path: "likes", element: <Likes /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
