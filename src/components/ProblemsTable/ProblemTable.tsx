import { problems } from '@/mockProblem/problem';
import Link from 'next/link';
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';

type Props = {}

function ProblemTable({}: Props) {
  return (
    <tbody className='text-white'>
        {problems.map((doc,idx)=>{
            const difficultyColor = doc.difficulty === "Easy" ? "text-green-500" : doc.difficulty === "Medium" ? "text-yellow-500" : "text-red-500";
            return (
                <tr className={`${idx % 2 == 1 ? 'bg-zinc-700': ''}`} key={doc.id}>
                    <th className='px-2 py-4 font-medium whitespace-nowrap text-green-500'>
                        <BsCheckCircle fontSize={"18"} width={"18"}/>
                    </th>
                    <td className='px-6 py-4'>
                    <Link className='hover:text-blue-600 cursor-pointer' href={`/problem/${doc.id}`}>
                        {doc.title}
                    </Link>
                    </td>
                    <td className={`px-6 py-4 ${difficultyColor}`}>
                        {doc.difficulty}
                    </td>
                    <td className='px-6 py-4'>
                        {doc.category}
                    </td>
                    <td>
                        {doc.videoId ? (
                            <AiFillYoutube
                            fontSize={"28"}
                            className='cursor-pointer hover:text-red-600'
                            />
                        ) : (
                            <p className='text-gray-400'>Coming soon</p>
                        )}
                    </td>
                </tr>
            )
        })}
    </tbody>
  )
}

export default ProblemTable;