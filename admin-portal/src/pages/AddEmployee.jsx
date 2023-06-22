import React, {useState} from "react";
import './Signup/signup.css';
import axios from "axios";
import { NavLink, useNavigate, Navigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {

    const navigate = useNavigate();

    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[national_identity, setNational_identity] = useState('');
    const[telephone, setTelephone] = useState('');
    const[email, setEmail] = useState('');
    const [department, setDepartment] = useState('')
    const [position, setPosition ] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const errors = {};

        if(!firstname) {
            errors.firstname = "firstname is required"
        }

        if(!lastname) {
            errors.lastname = "lastname is required"
        }

        if (!national_identity) {
            errors.national_identity = "National ID is required";
          } else if (!/^\d+$/.test(national_identity)) {
            errors.national_identity = "National ID should only contain numbers";
          }

        if (!telephone) {
            errors.telephone = "Phone number is required";
        } else if (!/^0\d+$/.test(telephone)) {
            errors.telephone = "Invalid phone number";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address";
        }

        if(!department) {
            errors.department = "department is required"
        }

        if(!position) {
            errors.position = "position is required"
        }

        
          setErrors(errors);
          return Object.keys(errors).length === 0;
    }

    // const handleGoBack = () => {
    //     return <Navigate to="/dashboard" />
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!validateForm()){
            return;
        }
        setLoading(true);

        const employee = {
           firstname: firstname,
           lastname: lastname,
           national_identity: national_identity,
           telephone: telephone,
           email: email,
           department: department,
           position: position,
        }
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:9000/employee/', employee, { headers: { Authorization: `Bearer ${token}` }, });
                toast.success("Successfully created your account")
                setFirstname('')
                setLastname('')
                setNational_identity('')
                setTelephone('')
                setEmail('')
                setDepartment('')
                setPosition('')

                setLoading(false);
                navigate('/dashboard');
            
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.error || error?.message|| "An error occurred");
        }
    }
    return(
        <div className="container">
      <ToastContainer position="top-right" />
      <form className="form card" >
        <h2>Register New Candidate</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Firstname"
            className={`form-control ${
              errors.firstname ? "is-invalid" : ""
            }`}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && (
            <div className="invalid-feedback">{errors.firstname}</div>
          )}
        
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lastname"
            className={`form-control ${
              errors.lastname ? "is-invalid" : ""
            }`}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && (
            <div className="invalid-feedback">{errors.lastname}</div>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="number"
            placeholder="Employee National Id"
            className={`form-control ${errors.national_identity ? "is-invalid" : ""}`}
            value={national_identity}
            onChange={(e) => setNational_identity(e.target.value)}
          />
          {errors.national_identity && (
            <div className="invalid-feedback">{errors.national_identity}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Employee Telephone"
            className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          {errors.telephone && (
            <div className="invalid-feedback">{errors.telephone}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Employee email"
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Department"
            className={`form-control ${
              errors.department ? "is-invalid" : ""
            }`}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          {errors.departement && (
            <div className="invalid-feedback">{errors.departement}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Employee Position"
            className={`form-control ${
              errors.position ? "is-invalid" : ""
            }`}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          {errors.position && (
            <div className="invalid-feedback">{errors.position}</div>
          )}
        </div>
        
        <button
          type="submit"
          className="btn btn-submit"
          onClick={handleSubmit}
        >
          {loading ? "Registering Candidate..." : "Register Candidate"}
        </button>
        <button className="btn btn-transparent" onClick={() => navigate('/dashboard')}>Go Back</button>
      </form>
    </div>
    )
};

export default AddEmployee;