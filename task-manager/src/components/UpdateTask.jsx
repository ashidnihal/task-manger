import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskDetailApi, UpdateTaskAPI } from '../services/allAPIs';

function UpdateTask() {
  const navigate=useNavigate()

    const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: "", 
  });
  console.log(formData);
  
  const[error,setError]=useState("")
  const handleUpdateTask = async () => {
    try {
      const token = sessionStorage.getItem('access');
      if (!token) {
        console.error("No access token found");
        return;
      }
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      };

      const response = await UpdateTaskAPI(id, formData, reqHeader); 
      console.log(response);
      
      if (response.status === 200) {
        alert("Task updated successfully!"); 
        navigate('/dashboard'); 
      } else {
        console.error("Failed to update task:", response.statusText);
        setError("Failed to update task: " + response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while updating task:", error);
      setError("An error occurred while updating the task.");
    }
  };


  const fetchTaskDetails=async(taskId)=>{
    try {
      const token=sessionStorage.getItem("access")
      if(!token){
        console.error("no token")
      }
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization": "Bearer "+token,
      }
      const response=await getTaskDetailApi(taskId,reqHeader)
      if(response.status===200){
        const {title,description,status}=response.data
        setFormData({
          title,
          description,
          status
        })
        
      }else{
        console.error("Failed to fetch task details:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while fetching task details:", error);
      setError("Failed to fetch task details");
    }
  };
  useEffect(()=>{
    fetchTaskDetails(id)
  },[id])
  return (
    <div className="container bg-light p-5 my-5" style={{borderRadius:"15px"}}>
      <div>
        <h4>Update task</h4>
        <div className="form-group mt-5">
        <label className="form-label text-dark">Task Title</label>
        <input className="form-control" type="text" placeholder="Task Title"  value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}></input>
        <label  className="form-label text-dark mt-5">Task Description</label>
        <input className="form-control " type="text" placeholder="Task Description" value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}></input>
        </div>
        <div class="form-check form-switch mt-4">
        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"  checked={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.checked })}></input>
        <label className="form-check-label" for="flexSwitchCheckDefault">Mark as Completed</label>
      </div>
      {error && <p className="text-danger">{error}</p>}
        <div className='text-center mt-4'>
          <button className='btn btn-success' onClick={handleUpdateTask}>Update Task</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateTask