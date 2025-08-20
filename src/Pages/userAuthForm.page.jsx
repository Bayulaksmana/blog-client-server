import InputBox from "@/components/input.component"
import { Link, Navigate } from "react-router"
import AnimationWrapper from "@/common/page-animation"
import { useContext, useRef } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { storeInSession } from "@/common/session";
import { UserContext } from "@/common/context";
import { authWithGoogle } from "@/common/firebase";

const UserAuthForm = ({ type }) => {
    const authForm = useRef()
    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
    const userAuthTroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_API_URL_BE + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data))
                setUserAuth(data)
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let serverRoute = type === "sign-in" ? "/signin" : "/signup"
        let form = new FormData(authForm.current)
        let formData = {}
        for (let [key, value] of form.entries()) {
            formData[key] = value
        }
        userAuthTroughServer(serverRoute, formData)
    }

    const handleGoogleAuth = (e) => {
        e.preventDefault()
        authWithGoogle().then(user => {
            let serverRoute = "/google-auth"
            let formData = {
                access_token: user.accessToken
            }
            userAuthTroughServer(serverRoute, formData)
        })
            .catch(err => {
                toast.error('Trouble login trough google')
                return console.log(err)
            })
    }

    return (
        access_token ?
            <Navigate to="/" /> :
            <AnimationWrapper key={type}>
                <section className="h-cover flex items-center justify-center">
                    {/* <Toaster /> */}
                    <form ref={authForm} action="" className="w-[80%] max-w-[400px]">
                        <h1 className="sm:text-4xl text-2xl tracking-widest font-myfont capitalize text-center mb-10">
                            {type === "sign-in" ? "~ Dega Nion Don ~" : "~ Join Us Today ~"}
                        </h1>
                        {
                            type !== "sign-in" ?
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                    icon="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"
                                />
                                : ""
                        }
                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Username by E-mail"
                            autocomplete="username"
                            icon="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.4702 20 14.8478 19.6034 16.0316 18.9114L15.0237 17.1835C14.1359 17.7026 13.1027 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12V13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13V9H14.6458C13.9407 8.37764 13.0144 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C13.0465 16 13.9991 15.5982 14.7119 14.9404C15.2622 15.5886 16.0831 16 17 16C18.6569 16 20 14.6569 20 13V12ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                        />
                        <InputBox
                            name="password"
                            type="password"
                            placeholder="New Password"
                            autocomplete={type === "signin" ? "current-password" : "new-password"}
                            icon="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM12 7C13.1046 7 14 7.89543 14 9C14 9.73984 13.5983 10.3858 13.0011 10.7318L13 15H11L10.9999 10.7324C10.4022 10.3866 10 9.74025 10 9C10 7.89543 10.8954 7 12 7Z"
                        />
                        {/* {
                        type === "sign-up" ?
                            <InputBox
                                name="renewpassword"
                                type="password"
                                placeholder="Renew Password"
                                autocomplete="new-password"
                                icon="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 7C10.8954 7 10 7.89543 10 9C10 9.74025 10.4022 10.3866 10.9999 10.7324L11 15H13L13.0011 10.7318C13.5983 10.3858 14 9.73984 14 9C14 7.89543 13.1046 7 12 7Z"
                            />
                            : ""
                    } */}

                        <button className="btn-dark mt-2 center" type="submit" onClick={handleSubmit}>
                            {type.replace("-", " ")}
                        </button>

                        <div className="relative w-full flex items-center gap-2 my-4 opacity-10 uppercase text-xs text-black font-bold">
                            <hr className="w-1/2 border-black" />
                            <p className="">or</p>
                            <hr className="w-1/2 border-black" />
                        </div>

                        <button className="btn-dark gap-3 flex justify-center items-center my-4 w-[80%]"
                            onClick={handleGoogleAuth}
                        >
                            <img src="/google.webp" alt="google-icon" className="w-5" />
                            Continue with google
                        </button>

                        {
                            type === "sign-in" ?
                                <p className="mt-6 text-gray-600 text-sm text-center tracking-wide">
                                    Don&apos;t have account ?
                                    <Link to="/signup" className="underline text-black text-sm ml-1">
                                        Join a member.
                                    </Link>
                                </p>
                                :
                                <p className="mt-6 text-gray-600 text-sm text-center tracking-wide">
                                    Already a member ?
                                    <Link to="/signin" className="underline text-black text-sm ml-1">
                                        Sign-in here.
                                    </Link>
                                </p>
                        }

                    </form>
                </section>
            </AnimationWrapper>

    )
}

export default UserAuthForm