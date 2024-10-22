import React, { useState } from 'react';
import { addTaskAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const navigate=useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: ""
  });

  const [error, setError] = useState("");

  const handleAddTask = async () => {
    const { title, description } = taskData;

    
    if (!title || !description) {
      setError("All fields are required");
      return;
    } else {
      setError(""); 
    }

    try {
      
      const token = sessionStorage.getItem('access');
      console.log(token);
      
      if (!token) {
        console.error("No access token found");
        return;
      }

      
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      };

      
      const response = await addTaskAPI(taskData, reqHeader);
      console.log(response.status);

      if (response.status === 201) { 
        console.log("Task created successfully:", response.data);
        alert("Task created successfully!");
        setTaskData({ title: "", description: "" }); 
        navigate('/dashboard')
      } else {
        console.error("Failed to create task:", response.statusText);
        setError("Failed to create task: " + response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while creating task:", error);
      setError("An error occurred while creating the task."); 
    }
  };

  return (
    <div className="container bg-light p-5 my-5" style={{ borderRadius: "15px" }}>
      <div>
        <h4>Add Task</h4>
        <div className="form-group mt-5">
          <label className="form-label text-dark">Task Title</label>
          <input
            className="form-control"
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />

          <label className="form-label text-dark mt-5">Task Description</label>
          <input
            className="form-control"
            type="text"
            placeholder="Task Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
        </div>

        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleAddTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
