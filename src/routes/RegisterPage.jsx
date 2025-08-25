import { SignUp } from "@clerk/clerk-react"

const RegisterPage = () => {
    return (
        <div className='flex justify-center items-center h-[calc(100%-80px)] m-28'>
            <SignUp signInUrl="/login" />
        </div>
    )
}

export default RegisterPage