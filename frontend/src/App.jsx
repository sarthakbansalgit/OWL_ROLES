import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import FunctionalJobs from './components/FunctionalJobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ProfileCandidate from './components/ProfileCandidate'
import EditableProfile from './components/EditableProfile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
//super user imports
import AdminHome from './components/superUser/Components/adminHome/adminHome'
import Lists from './components/superUser/Pages/UserLists/UserLists'
import Orders from './components/superUser/Components/Orders/Orders'
import SuperLogin from './components/superUser/Components/Login/SuperLogin'
import AddNewApplicant from './components/superUser/Pages/AddNew/AddNewApplicant'
import AddNewCompany from './components/superUser/Pages/AddNew/AddNewCompany'
import AddNewRecruiter from './components/superUser/Pages/AddNew/AddNewRecruiter'
//super user imports end
import ProErr from './components/ProErr'
import NotFoundErr from './components/NotFoundErr'
import LearnMore from './components/LearnMore'
import LearnJob from './components/learn_job' // Add this import
import BlogHome from './components/blogComponents/BlogHome/BlogHome'
import CreatePost from './components/blogComponents/CreatePost'
import MyBlogs from './components/blogComponents/MyBlogs/MyBlogs'
import Pricing from './components/pricing'
import EditJob from './components/admin/EditJob'
import SupremeProtectedRoute from './components/superUser/Components/SupremeProtectedRoute'
import ViewUserProfile from './components/admin/ViewUserProfile'
import BlogProtectedRoute from './components/auth/BlogProtectedRoute'
import { useEffect, useState } from 'react'
import LoadingPage from './components/shared/LoadingPage'
import PostDetail from './components/blogComponents/PostDetail'
// import EditJob from './components/admin/EditJob'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <FunctionalJobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <ProfileCandidate />
  },
  {
    path: "/edit-profile",
    element: <EditableProfile />
  },
  {
    path: "/jobs-ai",
    element: <FunctionalJobs />
  },
  {
    path: "/learn-more",
    element: <LearnMore />
  },
  {
    path: "/learn", // Add this new route
    element: <LearnJob />
  },

  // **For blog pages**
  {
    path: "/blog",
    element: <BlogHome/>
  },
  {
    path: "/blog/createPost",
    element: <BlogProtectedRoute><CreatePost/></BlogProtectedRoute>
  },
  {
    path: "/blog/myBlogs",
    element: <MyBlogs/>
  },
  {
    path: "/blog/post/:id",
    element: <PostDetail/>
  },

  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/edit/:id",
    element: <ProtectedRoute><EditJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/view-user-profile/:userId", 
    element: <ProtectedRoute><ViewUserProfile /></ProtectedRoute>
  },

  // {
  //   path: "/admin/EditJob/:id",
  //   element: <ProtectedRoute><EditJob /></ProtectedRoute>
  // },

  // **For supreme user (highest level)**


/*
supreme user starts here
*/
{
    path: "/supreme",
    element: <SupremeProtectedRoute><SuperLogin /></SupremeProtectedRoute>
  },
  {
    path: "/supreme/adminHome",
    element: <ProtectedRoute><AdminHome /></ProtectedRoute>
  },

  {
    path: "/supreme/applicants",
    element: <ProtectedRoute><Lists type="user" /></ProtectedRoute>
  },
  {
    path: "/supreme/recruiters",
    element: <ProtectedRoute><Lists type="recruiter" /></ProtectedRoute>
  },
  {
    path: "/supreme/Companies",
    element: <ProtectedRoute><Lists type="companies" /></ProtectedRoute>
  },
  {
    path: "/supreme/applicants/add",
    element: <ProtectedRoute><AddNewApplicant/></ProtectedRoute>
  },
  {
    path: "/supreme/recruiters/add",
    element: <ProtectedRoute><AddNewRecruiter /></ProtectedRoute>
  },
  {
    path: "/supreme/Companies/add",
    element: <ProtectedRoute><AddNewCompany/></ProtectedRoute>
  },
  /*
  supreme user ends here
  */
  {
    path:"/pricing",
    element:<Pricing />
  },
  {
    path: "/supreme/JobVacancies",
    element: <ProtectedRoute><Orders /></ProtectedRoute>
  },
  {
    path:"/proErr",
    element:<ProErr/>
  },
  {
    path:"*",
    element:<NotFoundErr/>
  },

])
function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {isLoading ? <LoadingPage/> : (
        <div>
          <RouterProvider router={appRouter} />
        </div>
      )} */}

        <div>
          <RouterProvider router={appRouter} />
        </div>
    </>
  )
}

export default App