import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import MainLayout from "./layout/MainLayout";
import Homepage from "./routes/Homepage";
import PostListPage from "./routes/PostListPage";
import Write from "./routes/Write";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import OrganizationPage from "./routes/OrganizationPage";
import AlumniPage from "./routes/AlumniPage";
import DatabasePage from "./routes/DatabasePage";
import GaleryPage from "./routes/GaleryPage";
import PendaftaranPage from "./routes/PendaftaranPage";
import EditPost from "./routes/EditPost";
import SettingsPage from "./routes/SettingsPage";
import UserAuthForm from "./Pages/userAuthForm.page";
import SinglePostPage from './routes/SinglePostPage';
import { useEffect, useState } from "react";
import AnimationWrapper from "./common/page-animation";
import { lookInSession } from "./common/session";
import { UserContext } from "./common/context";
import Editor from "./Pages/editor.page";


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
            },
            {
                path: "editor",
                element: <Editor type="sign-up" />
            }
        ]
    }
]);


const App = () => {
    const [userAuth, setUserAuth] = useState({})
    useEffect(() => {
        let userInSession = lookInSession("user")
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
    }, [])
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <AnimationWrapper key={router}>
                    <UserContext.Provider value={{ userAuth, setUserAuth }}>
                        <RouterProvider router={router} />
                    </UserContext.Provider>
                </AnimationWrapper>
                <ToastContainer position='top-right' />
            </QueryClientProvider>
        </ClerkProvider>
    )

}

export default App;