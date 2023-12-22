import React from 'react'

type Props = {}

function CircleSkeleton({}: Props) {
  return (
    <div className='space-y-2.5 animate-pulse max-w-lg'>
        <div className='w-6 h-6 rounded-full bg-gray-600'></div>
    </div>
  )
}

export default CircleSkeleton