import axios from "axios";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/userContext";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import SignIn from "./pages/Sign-in";
import Signup from "./pages/SignUp";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/posts",
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
    loader: async () => axios("http://localhost:3333/posts", {withCredentials: true}),
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
