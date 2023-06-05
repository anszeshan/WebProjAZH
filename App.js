import "./App.css";
import { Navbar } from "./components/Navbar";
import { SideNavbar } from "./components/SideNavbar";
import LoginForm from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {Outlet} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Employees from "./components/Employees/Employees";
import Settings from "./components/Settings";
import Landing from "./components/LandingPage/Landing";
import Forbidden from "./components/ErrorTemplates/ForbiddenPage";
import PageNotFound from "./components/ErrorTemplates/PageNotFound";
import TableComp from "./components/TableComp/TableComp";
import Messenger from './components/Messenger'
import UserSignup from "./components/Signup/UserSignup";
import OrgSignup from "./components/Signup/OrgSignup";
import {Jobs} from "./components/Jobs/Jobs";
import {AddJob} from "./components/Jobs/AddJob";
import { UpdateJob } from "./components/Jobs/UpdateJob";
import { ViewJob } from "./components/Jobs/ViewJob";
import { Applicants } from "./components/Applicants/Applicants";
import { ViewApplicant } from "./components/Applicants/ViewApplicant";
import { UserViewJob } from "./components/Jobs/UserViewJob";
import { ViewUserJobs } from "./components/Jobs/ViewUserJobs";
import { WishlistJobs } from "./components/Jobs/WishlistJobs";
import Insights from './components/Insights'
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(state => state.user)
  console.log(user)
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signup/user" element={<UserSignup />} />
        <Route exact path="/signup/org" element={<OrgSignup />} />
        <Route exact path="/login" element={<LoginForm />} />
      
        <Route exact path="/forbidden" element={<Forbidden />} />

        <Route
          exact
          path="dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <SideNavbar />
                <div className="mt-20 pb-10 pt-4 ps-4 md:ml-10 2xl:ml-72">
                  <Outlet />
                </div>
              </>
            </ProtectedRoute>
          }
        >
          {/****************** ROUTES  *****************/}

         {user && (user.role === 'organization' || user.role ==='institute') && <Route
            exact
            path="insights"
            element={
              <ProtectedRoute>
                <Insights/>
              </ProtectedRoute>
            }
          />  }
          {user && (user.role === 'organization' || user.role ==='institute') &&<Route
            exact
            path="jobs"
            element={
              <ProtectedRoute>
                <Jobs/>
              </ProtectedRoute>
            }
          />  }
          { <Route
            exact
            path="jobs/add"
            element={
              <ProtectedRoute>
                <AddJob/>
              </ProtectedRoute>
            }
          />}
           {user && (user.role === 'organization' || user.role ==='institute') &&<Route
            exact
            path="jobs/view/:jobId"
            element={
              <ProtectedRoute>
                <ViewJob/>
              </ProtectedRoute>
            }
          />}
          {user && (user.role === 'organization' || user.role ==='institute') &&<Route
            exact
            path="jobs/edit/:jobId"
            element={
              <ProtectedRoute>
                <UpdateJob/>
              </ProtectedRoute>
            }
          />}

          {user && (user.role === 'organization' || user.role ==='institute') && <Route
            exact
            path="applicants"
            element={
              <ProtectedRoute>
                <Applicants/>
              </ProtectedRoute>
            }
          />}
          { user && (user.role === 'organization' || user.role ==='institute') &&<Route
            exact
            path="applicants/view/:appId"
            element={
              <ProtectedRoute>
                <ViewApplicant/>
              </ProtectedRoute>
            }
          />}
          {user && (user.role === 'student' || user.role ==='researcher') &&<Route
            exact
            path="user/jobs/view/:jobId"
            element={
              <ProtectedRoute>
                <UserViewJob/>
              </ProtectedRoute>
            }
          />}
           {user && (user.role === 'student' || user.role ==='researcher')&&<Route
            exact
            path="user/jobs"
            element={
              <ProtectedRoute>
                <ViewUserJobs/>
              </ProtectedRoute>
            }
          /> }
          {user && (user.role === 'student' || user.role ==='researcher')&&<Route
            exact
            path="user/jobs/wishlisted"
            element={
              <ProtectedRoute>
                <WishlistJobs/>
              </ProtectedRoute>
            }
          />}
          
           <Route
            exact
            path="messenger"
            element={
              <ProtectedRoute>
                <Messenger/>
              </ProtectedRoute>
            }
          />
        
          <Route
            exact
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ---------------- Routes that does not exist -------------------------- */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
