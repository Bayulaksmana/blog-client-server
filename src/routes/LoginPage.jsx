import { SignIn } from "@clerk/clerk-react"

const LoginPage = () => {
    return (
        <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
            <SignIn signUpUrl="/register" className="ph-10"/>
        </div>
    )
}

export default LoginPage