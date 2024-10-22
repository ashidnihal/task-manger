import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/allAPIs";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: ""
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!userData.first_name || !userData.last_name || !userData.email || !userData.username || !userData.password || !userData.confirm_password) {
      setError("All fields are required");
      return;
    }
    if (userData.password !== userData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerAPI(userData);
      console.log(response);
      
      if (response.status === 201) {
        console.log("Register successful");
        setUserData({
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
          confirm_password: ""
        });
        alert("Account created");
        navigate('/');
      }
      else {
       
        setError("User already exists");
       
      }
    } catch (error) {
      console.error("Registration error caught:", error);
    setError("An unexpected error occurred. Please try again.");
  }
  };

  console.log(userData);

  return (
    <div className="container my-5" style={{ maxWidth: "1000px" }}>
      <div className="card" style={{ borderRadius: "25px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-10 col-lg-6 d-flex align-items-center">
              <img
                src="https://img.freepik.com/free-vector/manager-prioritizing-tasks-list_74855-5272.jpg?w=996&t=st=1729314073~exp=1729314673~hmac=d0223e402efee902ac0b67756bd1e4bc860cf41aca9cc51135960e5d86e5fd97"
                className="img-fluid"
                alt="Sample"
              />
            </div>

            <div className="col-md-10 col-lg-6 d-flex flex-column align-items-center">
              <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>
              {error && <p className="text-danger">{error}</p>}
              
              <form onSubmit={handleRegister} className="w-100">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your First name"
                    onChange={e => setUserData({ ...userData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Last name"
                    onChange={e => setUserData({ ...userData, last_name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Username"
                    onChange={e => setUserData({ ...userData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={e => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat your password"
                    onChange={e => setUserData({ ...userData, confirm_password: e.target.value })}
                    required
                  />
                </div>

                <p>
                  Already have an account? <Link to="/">Login here</Link>
                </p>
                <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg mb-4">
                  Register
                </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
