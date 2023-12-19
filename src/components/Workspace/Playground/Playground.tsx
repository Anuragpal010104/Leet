import React from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split'
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

type Props = {}

function Playground({}: Props) {
  return (
    <div className='flex flex-col bg-zinc-800 relative'>
      <PreferenceNav/>
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60} >
        <div className="w-full overflow-auto">
            <ReactCodeMirror
            value='console.log("Hello World")'
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{fontSize:16}}
            />
        </div>
        <div className='w-full px-5 overflow-auto'>
            <div className='flex h-10 items-center space-x-6'>
                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                    <div className='text-sm font-medium leading-5 text-white'>
                        TestCases
                    </div>
                    <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                </div>
            </div>
            <div className="flex">
              {/* Case 1 */}
              <div className='mr-2 items-start mt-2 text-white'>
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-zinc-700 hover:bg-zinc-600 rounded-lg px-4 py-1 whitespace-nowrap'>
                     Case 1 
                  </div>
                </div>
              </div>
              {/* Case 2 */}
              <div className='mr-2 items-start mt-2 text-white'>
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-zinc-700 hover:bg-zinc-600 rounded-lg px-4 py-1 whitespace-nowrap'>
                     Case 2 
                  </div>
                </div>
              </div>
              {/* Case 3 */}
              <div className='mr-2 items-start mt-2 text-white'>
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-zinc-700 hover:bg-zinc-600 rounded-lg px-4 py-1 whitespace-nowrap'>
                     Case 3 
                  </div>
                </div>
              </div>
            </div>
            <div className='font-semi-bold my-5'>
              <p className='text-sm font-medium mt-4 text-white'>
                Input:
              </p>
              <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-700 border-transparent text-white mt-2'>
                nums: [2,7,11,15], target: 9
              </div>
              <p className='text-sm font-medium mt-4 text-white'>
                Output:
              </p>
              <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-700 border-transparent text-white mt-2'>
                [0,1]
              </div>
            </div>
        </div>
      </Split>
    </div>
  )
}

export default Playground