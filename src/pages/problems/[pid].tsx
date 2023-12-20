import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import { problems } from '@/utils/problems'
import { Problem } from '@/utils/types/problem'
import React from 'react'

type ProblemPageProps = {
  problem: Problem;
}

const ProblemPage: React.FC<ProblemPageProps> = ({problem}) => {
  console.log(problem)
  return (
    <div>
      <Topbar problemPage={true}/>
      <Workspace problem={problem}/>
    </div>
  )
}

export default ProblemPage

//fetch the data
//SSG
// getStaticPaths -> it gives us dynaminc routes 
export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) =>({
    params: { pid: key }
  }))
  return {
    paths,
    fallback: false
  }
}

// getStaticProps -> it fetches data

export async function getStaticProps({params}:{params:{ pid: string } }) {
  const {pid} = params;
  const problem = problems[pid];

  if(!problem) {
    return {
      notFound: true
    }
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem
    }
  }
}