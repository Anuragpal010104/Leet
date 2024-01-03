import { authModalState } from '@/atoms/authModalAtom'
import AuthModel from '@/components/Modals/AuthModel'
import Navbar from '@/components/Navbar/Navbar'
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'
import Image from 'next/image'
type AuthPageProps = {};

const AuthPage:React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user,error,loading] = useAuthState(auth);
    const router = useRouter();
    const [pageLoading,setPageLoading] = useState(true);
    useEffect(()=>{
        if(user) router.push("/")
        if(!loading && !user) setPageLoading(false);

    },[user,router,loading])
    if(pageLoading) return null;
  return (
    <div className='bg-gradient-to-b from-gray-600 to to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar/>
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <Image src="/hero.png" alt="Hero Image" width={700} height={700} />
                
            </div>
            {authModal.isOpen && <AuthModel/>}    
        </div>
    </div>
  )
}

export default AuthPage;