import { auth } from '@/firebase/firebase'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Logout from '../Buttons/Logout'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BsList } from 'react-icons/bs'
import Timer from '../Timer/Timer'
import { useRouter } from 'next/router'
import { problems } from '@/utils/problems'
import { Problem } from '@/utils/types/problem'

type Props = {
	problemPage?: boolean;
}

function Topbar({problemPage}: Props) {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();
	const handleProblemChange = (isForward: boolean) => {
		const {order} = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key)=> problems[key].order === nextProblemOrder);

		if(isForward && !nextProblemKey){
			const firstProblemKey = Object.keys(problems).find((key)=> problems[key].order === 1);
			router.push(`/problems/${firstProblemKey}`)
		}
		else if(!isForward && !nextProblemKey){
			const lastProblemKey = Object.keys(problems).find((key)=> problems[key].order === Object.keys(problems).length);
			router.push(`/problems/${lastProblemKey}`)
		}
		else{
			router.push(`/problems/${nextProblemKey}`)
		}

	}

  return (
    <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-800 text-gray-400'>
			<div className={`flex w-full items-center justify-between 
			${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				<Link href='/' className='h-[22px] flex-1'>
					<Image src="/logo-full.png" alt='Logo' height={100} width={100}/>
				</Link>

				{problemPage && (
					<div className='flex items-center gap-4 flex-1 justify-center '>
						<div className='flex items-center justify-center rounded bg-zinc-600 hover:bg-gray-500 h-8 w-8 cursor-pointer'
						onClick={()=>{
							handleProblemChange(false)
						}}>
							<FaChevronLeft/>
						</div>
						<Link href="/" className='flex items-center gap-2 font-medium max-w-[170px] text-gray-100 cursor-pointer'>
							<div>
								<BsList/>
							</div>
							<p>Problems List</p>
						</Link>
						<div className='flex items-center justify-center rounded bg-zinc-600 hover:bg-gray-500 h-8 w-8 cursor-pointer'
						onClick={()=>{
							handleProblemChange(true)
						}}>
							<FaChevronRight/>
						</div>
					</div>
				)}

				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						<a
							href='#'
							target='_blank'
							rel='noreferrer'
							className='bg-slate-600 py-1.5 px-3 cursor-pointer rounded text-orange-400 hover:bg-dark-fill-2'
						>
							Premium
						</a>
					</div>
					{!user && (
							<Link href='/auth' onClick={()=>{
								setAuthModalState((prev)=>({...prev,isOpen: true,type: "login"}))
							}}>
								<button className='bg-slate-600 py-1 px-2 cursor-pointer rounded '>Sign In</button>
							</Link>
					) }
					{user && problemPage && <Timer/>}
					{user && (
						<div className='cursor-pointer group relative'>
							<img src="/avatar.png" alt="user profile" className='h-8 w-8 rounded-full' />
							<div className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto text-orange-400 p-2 rounded shadow-lg z-40 group hover:scale-100 scale-0 transition-all 300 ease-in-out'>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
					{user && <Logout/>}
				</div>
			</div>
</nav>
  )
}

export default Topbar