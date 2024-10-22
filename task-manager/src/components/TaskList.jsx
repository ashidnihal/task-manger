import React, { useEffect, useState } from 'react';
import { FaPlus, FaPencil, FaTrashCan, FaFilter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { DeleteTaskAPI, getTaskAPI, getTaskByStatusAPI, UpdateTaskAPI } from '../services/allAPIs';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

 
  const fetchTasks = async (status = "") => {
    try {
      const token = sessionStorage.getItem("access");
      if (!token) {
        console.error("No token found");
        return;
      }
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      };

      let response;
      if (status === "all") {
        response = await getTaskAPI(reqHeader); 
      } else {
        response = await getTaskByStatusAPI(status, reqHeader); 
      }

      if (response.status === 200) {
        setTasks(response.data);
        console.log("Tasks fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch tasks:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while fetching tasks:", error);
      setError("Failed to fetch tasks");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = sessionStorage.getItem('access');
      if (!token) {
        console.error("No token found");
        return;
      }
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      };
      await DeleteTaskAPI(taskId, reqHeader);
      fetchTasks(filterStatus); 
      console.log(`${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error occurred while deleting task:", error);
      setError("Failed to delete task");
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    fetchTasks(status); 
  };
  const handleStatusChange = async (taskId, currentStatus, title, description) => {
    try {
      const token = sessionStorage.getItem('access');
      if (!token) {
        console.error("No token found");
        return;
      }
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      };

     
      const reqBody = { title: title , description: description, status: !currentStatus }; 

      
      await UpdateTaskAPI(taskId, reqBody, reqHeader);
      fetchTasks(filterStatus); 
      console.log(`Task ${taskId} status updated successfully.`);
    } catch (error) {
      console.error("Error occurred while updating task status:", error);
      setError("Failed to update task status");
    }
  };

  useEffect(() => {
    fetchTasks("all"); 
  }, []);

  return (
    <div className="container">
    
      <div className="row mt-5">
        <div className="col-12 col-md-6">
          <h5>Task List</h5>
        </div>
        <div className="col-12 col-md-6 text-end mt-3 mt-md-0">
          <div className="d-flex justify-content-end">
            
            <Link to={'/addtask'}>
              <button className='btn btn-success me-2'>
                <FaPlus /> Add Task
              </button>
            </Link>

         
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <FaFilter />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button className="dropdown-item" onClick={() => handleFilterChange("all")}>All Tasks</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleFilterChange("pending")}>Pending Tasks</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleFilterChange("completed")}>Completed Tasks</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

   
      <div className="table-responsive mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <div className="form-check ms-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`task-${task.id}`}
                        checked={task.status} 
                        onChange={() => handleStatusChange(task.id, task.status, task.title, task.description)} 
                      />
                    </div>
                  </td>
                  <td>
                    <Link to={`/updatetask/${task.id}`}>
                      <FaPencil className="me-3 text-primary" />
                    </Link>
                    <FaTrashCan onClick={() => handleDelete(task.id)} className="text-danger" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
