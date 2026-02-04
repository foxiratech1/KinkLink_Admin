import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import OtpVerificationPage from "./pages/AuthPages/OtpVerification";
import ChangePasswordPage from "./pages/AuthPages/ChangePassword";
import AllUsersPage from "./pages/Users/AllUsersPage";
import PendingUsersPage from "./pages/Users/PendingUsersPage";
import RejectUsersPage from "./pages/Users/RejctUsersPage";
import BlockedUsersPage from "./pages/Users/BlockedUserPage";
import UserDetailsPage from "./pages/Users/UserDetailsPage";
import InterestManagementPage from "./pages/Interests/InterestManagementPage";
import EventManager from "./pages/Events/EventManager";
import CommingSoon from "./pages/OtherPage/CommingSoon";
import SystemIssueManage from "./pages/SystemIssues/SystemIssueManage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" index element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/system-issues" element={<SystemIssueManage />} />

              {/* User Management */}
              <Route path="/users/all" element={<AllUsersPage />} />
              <Route path="/users/pending" element={<PendingUsersPage />} />
              <Route path="/users/reject" element={<RejectUsersPage />} />
              <Route path="/users/blocked" element={<BlockedUsersPage />} />
              <Route path="/users/details/:id" element={<UserDetailsPage />} />

              {/* Interest Management */}
              <Route path="/interests" element={<InterestManagementPage />} />
              <Route path="/events" element={<EventManager />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* UI Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />

            </Route>
          </Route>


          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/verify-otp/:id" element={<OtpVerificationPage />} />
          <Route path="/login-verify-otp/:id" element={<OtpVerificationPage />} />
          <Route path="/change-password/:token" element={<ChangePasswordPage />} />
          <Route path="/coming-soon" element={<CommingSoon />} />





          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </>
  );
}
