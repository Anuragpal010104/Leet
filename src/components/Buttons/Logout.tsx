import { auth } from '@/firebase/firebase';
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi'
type Props = {}

function Logout({}: Props) {
    const [signOut,loading,error] = useSignOut(auth);
    const handleLogout = () => {
        signOut();
    }
  return (
    <button className='bg-zinc-700 py-1.5 px-3 cursor-pointer rounded text-orange-400'
    onClick={handleLogout}
    >
        <FiLogOut/>
    </button>
  )
}

export default Logout