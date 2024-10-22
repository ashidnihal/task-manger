import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';

function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/addtask" element={<AddTask/>}/>
          <Route path="/updatetask/:id" element={<UpdateTask/>}/>

        </Routes>
      
    </>
  );
}

export default App;
