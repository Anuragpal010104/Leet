import { Problem } from '@/utils/types/problem'
import React from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { TiStarOutline } from 'react-icons/ti'

type ProblemDescriptionProps = {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem}) =>{
  return (
    <div className='bg-zinc-800'>
    {/* TAB */}
    <div className='flex h-11 w-full items-center pt-2 bg-zinc-900 text-white overflow-x-hidden'>
      <div className={"bg-zinc-800 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
        Description
      </div>
    </div>

    <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
      <div className='px-5'>
        {/* Problem heading */}
        <div className='w-full'>
          <div className='flex space-x-4'>
            <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem?.title}</div>
          </div>
          <div className='flex items-center mt-3'>
            <div
              className={`text-green-400 bg-green-400 inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
            >
              Easy
            </div>
            <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-green-500'>
              <BsCheck2Circle />
            </div>
            <div className='flex items-center cursor-pointer hover:bg-zinc-700 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-gray-400'>
              <AiFillLike />
              <span className='text-xs'>120</span>
            </div>
            <div className='flex items-center cursor-pointer hover:bg-zinc-700 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-gray-400'>
              <AiFillDislike />
              <span className='text-xs'>2</span>
            </div>
            <div className='cursor-pointer hover:bg-zinc-700  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-gray-400 '>
              <TiStarOutline />
            </div>
          </div>

          {/* Problem Statement(paragraphs) */}
          <div className='text-white text-sm'>
            <div
              dangerouslySetInnerHTML={{
                __html: problem.problemStatement
              }}
            />
          </div>

          {/* Examples */}
          <div className='mt-4'>
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className='text-white text-sm font-medium'>Example {index + 1}:</p>
                  {example.img && (
                      <img src={example.img} alt='example'className='mt-3' />
                  )}
                  <div className='example-card'>
                    <pre>
                      <strong className='text-white'>Input</strong>{example.inputText}
                      <br />
                      <strong className='text-white'>Output</strong>{example.outputText}
                      {
                        example.explanation && (
                          <>
                            <br />
                            <strong className='text-white'>Explanation</strong>{example.explanation}
                          </>
                        )
                      }
                    </pre>

                  </div>
                </div>

              ))}
          </div>

          {/* Constraints */}
          <div className='my-8 pb-4'>
            <div className='text-white text-sm font-medium'>Constraints:</div>
            <ul className='text-white ml-5 list-disc'>
              <div
                dangerouslySetInnerHTML={{
                  __html: problem.constraints
                }}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProblemDescription