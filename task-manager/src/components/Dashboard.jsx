import React from 'react'
import Profile from './Profile'
import TaskList from './TaskList'

function Dashboard() {
  return (
    <div className='container bg-light p-5 my-5' style={{borderRadius:"15px"}}>
                    <Profile/>
       
        
                <TaskList/>
    
    </div>
        
  )
}

export default Dashboard