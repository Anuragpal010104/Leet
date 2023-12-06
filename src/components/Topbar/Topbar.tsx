import Link from 'next/link'
import React from 'react'

type Props = {}

function Topbar({}: Props) {
  return (
    <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-800 text-gray-400'>
			<div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
				<Link href='/' className='h-[22px] flex-1'>
					<img src='/logo-full.png' alt='Logo' className='h-full' />
				</Link>

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
					<Link href='/auth'>
						<button className='bg-slate-600 py-1 px-2 cursor-pointer rounded '>Sign In</button>
					</Link>
				</div>
			</div>
</nav>
  )
}

export default Topbar