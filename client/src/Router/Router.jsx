import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Login from "../Components/Login.jsx";
import UserRegister from "../Components/User/UserRegister.jsx";
import CharityRegister from "../Components/Charity/CharityRegister.jsx";
import CharityProfile from "../Components/Charity/CharityProfile.jsx";
import UserProfile from "../Components/User/UserProfile.jsx";
import LandingFood from "../BasicPage/LandingFood.jsx";
import About from "../BasicPage/About.jsx";
import CharityList from "../Components/Charity/CharityList.jsx";
import UnAuthorizedCharityIntro from "../Components/Charity/UnAuthorizedCharityIntro.jsx";
import DonationForm from "../Components/Donation/DonationForm.jsx";
import DonationList from "../Components/Donation/DonationList.jsx";
import DonationView from "../Components/Donation/DonationView.jsx";
import DonationHistory from "../Components/DonationHistory.jsx";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<LandingFood />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="user/register" element={<UserRegister />} />
      <Route path="charity/register" element={<CharityRegister />} />

      {/* Protected User Routes */}
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="user/profile" element={<UserProfile />} />
      </Route>

      {/* Protected Charity Routes */}
      <Route element={<PrivateRoute allowedRoles={["charity"]} />}>
        <Route path="charity/profile" element={<CharityProfile />} />
        <Route path="get-donation" element={<DonationList />} />
      </Route>

      {/* Shared Routes for User and Charity */}
      <Route element={<PrivateRoute allowedRoles={["user", "charity"]} />}>
        <Route path="charity" element={<CharityList />} />
        <Route path="donation/create" element={<DonationForm />} />
        <Route path="donation/:id" element={<DonationView />} />
        <Route path="donation/history" element={<DonationHistory />} />
      </Route>

      {/* Fallback for unauthorized users */}
      <Route path="charity" element={<UnAuthorizedCharityIntro />} />

      {/* 404 Page */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Route>
  )
);
