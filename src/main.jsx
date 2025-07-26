import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import Homepage from './routes/Homepage';
import PostListPage from './routes/PostListPage';
import SinglePostPage from './routes/SinglePostPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import MainLayout from './layout/MainLayout';
import Write from './routes/Write';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import OrganizationPage from './routes/OrganizationPage';
import AlumniPage from './routes/AlumniPage';
import DatabasePage from './routes/DatabasePage';
import GaleryPage from './routes/GaleryPage';
import PendaftaranPage from './routes/PendaftaranPage';
import EditPost from './routes/EditPost';
import SettingsPage from './routes/SettingsPage';
import UserAuthForm from './Pages/userAuthForm.page';


const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/posts",
        element: <PostListPage />
      },
      {
        path: "/:slug",
        element: <SinglePostPage />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/organization",
        element: <OrganizationPage />
      },
      {
        path: "/alumni",
        element: <AlumniPage />
      },
      {
        path: "/database",
        element: <DatabasePage />
      },
      {
        path: "/galery",
        element: <GaleryPage />
      },
      {
        path: "/pendaftaran",
        element: <PendaftaranPage />
      },
      {
        path: "/edit/:id",
        element: <EditPost />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "signin",
        element: <UserAuthForm type="sign-in" />
      },
      {
        path: "signup",
        element: <UserAuthForm type="sign-up" />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='top-right' />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
);

