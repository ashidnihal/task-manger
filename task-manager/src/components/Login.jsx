import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAPI } from '../services/allAPIs';
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate=useNavigate()

    const [userData,setuserData]=useState({
        "username":"",
        "password":""
    })
    const[error,setError]=useState("")
    const[loading,setLoading]=useState(false)
    console.log(userData);
    const handlelogin=async()=>{
        if(!userData.username||!userData.username){
                setError("All fields are required")
        }
        setLoading(true)
        try {
            const response=await loginAPI(userData)
            // console.log(response);
            if(response.status===200){
            const data=response.data
                const {access,refresh}=data
                sessionStorage.setItem("access",access)
                sessionStorage.setItem("refresh",refresh)
                navigate('/dashboard')
           
            }else{
               
                console.log(response.response.data.error);
                
                setError(response.response.data.error || "Login failed. Please try again.");
            }
          
        } catch (error) {
          console.error("Login error caught:", error); 

      
        
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div className="container my-5" style={{ maxWidth: "1000px" }}>
    <div className="card" style={{ borderRadius: "25px" }}>
      <div className="card-body">
        <div className="row">
        
          <div
            className="col-md-10 col-lg-6  d-flex 
           align-items-center"
          >
            <img
              src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?t=st=1729315012~exp=1729318612~hmac=c9bfbf666de34ab601ff8974eb553cff36ae4942b4c844277b94b3eafef98861&w=740"
              className="img-fluid"
              alt="Sample"
            />
          </div>

         
          <div className="col-md-10 col-lg-6 d-flex flex-column align-items-center">
            <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-5">
              Sign in
            </h1>

           {error&&<p className='text-danger'>{error}</p>}
            
            <div className="form-group mb-3 w-75 mt-3">
      
              <input
                type="text"
                className="form-control"
                id="form2"
                placeholder="Enter your Username"
                onChange={(e)=>{setuserData({...userData,username:e.target.value})}}
              />
            </div>

        
            <div className="form-group mb-3 w-75 mt-2">
        
              <input
                type="password"
                className="form-control"
                id="form3"
                placeholder="Enter your password"
                onChange={(e)=>{setuserData({...userData,password:e.target.value})}}
              />
            </div>

          
           

          
            <button type="button" onClick={handlelogin} className="btn btn-primary btn-lg mb-4"disabled={loading}>{loading ? "Loading..." : "Login"}</button>
             
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login