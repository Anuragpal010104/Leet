import React from 'react'
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription'

type Props = {}

function Workspace({}: Props) {
  return (
    <Split className='split' minSize={0}>
        <ProblemDescription/>
        <div>
            <div>Editor</div>
            <div>Output</div>
        </div>
    </Split>
  )
}

export default Workspace