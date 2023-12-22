import CircleSkeleton from '@/components/Skeletons/CircleSkeleton'
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton'
import { firestore } from '@/firebase/firebase'
import { DBProblem, Problem } from '@/utils/types/problem'
import { set } from 'firebase/database'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { TiStarOutline } from 'react-icons/ti'

type ProblemDescriptionProps = {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem}) =>{
  const {currentProblem,loading,problemDififcultyClass} = useGetCurrentProblem(problem.id)
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

          {!loading && currentProblem && (
                      <div className='flex items-center mt-3'>
                      <div
                        className={`${problemDififcultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                      >
                        {currentProblem.difficulty}
                      </div>
                      <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-green-500'>
                        <BsCheck2Circle />
                      </div>
                      <div className='flex items-center cursor-pointer hover:bg-zinc-700 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-gray-400'>
                        <AiFillLike />
                        <span className='text-xs'>{currentProblem.likes}</span>
                      </div>
                      <div className='flex items-center cursor-pointer hover:bg-zinc-700 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-gray-400'>
                        <AiFillDislike />
                        <span className='text-xs'>{currentProblem.dislikes}</span>
                      </div>
                      <div className='cursor-pointer hover:bg-zinc-700  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-gray-400 '>
                        <TiStarOutline />
                      </div>
                    </div>
          )}

          {loading && (
            <div className='mt-3 flex space-x-2 '>
              <RectangleSkeleton/>
              <CircleSkeleton/>
              <RectangleSkeleton/>
              <RectangleSkeleton/>
              <CircleSkeleton/>
            </div>
          )}

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

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDififcultyClass, setProblemDifficultyClass] = useState<string>("");

  useEffect(()=>{
    const getCurrentProblem = async () =>{
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const problem = docSnap.data();
        setCurrentProblem({id: docSnap.id, ...problem} as DBProblem);
        setProblemDifficultyClass(problem?.difficulty === "Easy" ? "bg-green-400 text-green-400" : problem?.difficulty === "Medium" ? "bg-yellow-400 text-yellow-400" : "bg-red-400 text-red-400")
      }
      setLoading(false);
    }
    getCurrentProblem();
  },[problemId])

  return {currentProblem, loading, problemDififcultyClass}
}