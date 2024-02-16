import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import App from "../App";
import { fetchData, fetchListeningById } from "../services/ApiController";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import RegistrationForm from "../pages/Signup";
import FormModel from "../pages/NewListing";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* routes pour l'utilisateur ou visiteur  */}
      <Route element={<RootLayout />} path="/">
        <Route
          index
          element={<App />}
          loader={async () => fetchData("listings")}
        />
        <Route
          element={<Details />}
          path="/listings/details/:id"
          loader={async ({ params }) => fetchListeningById(params.id)}
        />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Logout />} path="/logout" />
      <Route element={<RegistrationForm />} path="/signup" />
      <Route element={<FormModel />} path="/newlisting" />
    </Route>
  )
);

export default AppRoutes;
