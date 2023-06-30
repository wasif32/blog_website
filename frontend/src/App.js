import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/read/:id",
    element: (
      <div>
        <Navbar />
        <Single />
        <Footer />
      </div>
    ),
  },
  {
    path: "/write",
    element: (
      <div>
        <Navbar />
        <Write />
        <Footer />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
