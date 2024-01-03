import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/firebase';
import  { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil'

type LoginProps = {}

const Login:React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: "login" | "signup" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type: type as "login" | "forgotPassword" | "register" }));
	};
  
    const [inputs,setInputs] = useState({email:"",password:""})
    const [signInWithEmailAndPassword,
    user,
    loading,
    error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password) return alert("Please fill all the fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email,inputs.password);
            if(!newUser) return;
            router.push("/")
        } catch (error:any) {
            if(error) toast.error(error.message,{position:"top-center",theme:"dark"});
        }
    }
    useEffect(()=>{
        if(error) toast.error(error.message,{position:"top-center",theme:"dark"});
    },[error])
  return (
    <form className='space-y-6 px-6 pb-4 ' onSubmit={handleLogin}>
        <h3 className='text-xl font-medium text-white'>Sign in to LeetCode</h3>
        <div>
            <label htmlFor="email" className='text-small font-medium block mb-2 text-gray-300'>
                Email address
            </label>
            <input 
            onChange={handleInputChange}
            type="email" name='email' id='email' 
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white'
            placeholder='name@company.com'/>
        </div>
        <div>
            <label htmlFor="password" className='text-small font-medium block mb-2 text-gray-300'>
              Your Password
            </label>
            <input
            onChange={handleInputChange} 
            type="password" name='password' id='password' 
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white'
            placeholder='**********'/>
        </div>
        <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 bg-orange-400 hover:bg-orange-500'>
            {loading ? "Loading..." : "Sign In"}
        </button>
        <button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")}>
            <a href="#" className='text-sm text-orange-400 hover:underline w-full text-right'>
                Forgot password?
            </a>
        </button>
        <div className='text-sm font-medium text-gray-300'>
            Not Registererd
            <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick("signup")}>
                Create an account
            </a>
        </div>
    </form>
  )
}

export default Login;