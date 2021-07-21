import React from 'react';
import WrapLayout from '../components/wrapLayout/WrapLayout'

const TestWrapLayout = ({


}) => {

  return(
    <div>
      <WrapLayout justifyContent='space-around'>
        {
          ['沐浴露','洗发水','美白','防晒','润肤霜'].map((item,index) => (
            <div key={index} style={{padding: '0.5em 1em',border:'1px solid #456'}}> {item} </div>
          ))
        }
      </WrapLayout>

      <div style={{marginTop:'3em'}}>
        <WrapLayout justifyContent='center'>
          {
            ['沐浴露','洗发水','美白','防晒','润肤霜'].map((item,index) => (
              <div key={index} style={{padding: '0.5em 1em',border:'1px solid #456',margin:'0 1em'}}> {item} </div>
            ))
          }
        </WrapLayout>
      </div>
    </div>
  )

}

export default TestWrapLayout
