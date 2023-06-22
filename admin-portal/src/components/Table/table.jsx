import React, { useEffect } from "react";
import {AiOutlineSearch} from 'react-icons/ai';
import axios from "axios";
import { NavLink , useNavigate} from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import './table.css'

const Table = () => {

    const token = localStorage.getItem('token');
    const [vehicles, setVehicles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9000/vehicle", { headers: { Authorization: `Bearer ${token}` }, })
        .then(res => {
            setVehicles(res.data.vehicles);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        })
    }, [])

    const handleDelete = (vehicleId) => {
        axios.delete(`http://localhost:9000/vehicle/${vehicleId}`)
        .then((res) =>{
            // update the state of vehicles
            const updatedVehicles = vehicles.filter((item) => item._id !== vehicleId);
            setVehicles(updatedVehicles);
        })
        .catch((error) => {
            console.error("Error deleting data: ", error);
        })
    }

    const handleAssign = (vehicle) => {
        navigate(`/assignVehicle/${vehicle._id}`);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
  
    
    // Calculate total number of pages based on vehicles length and items per page
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  // Get current page vehicles
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vehicles.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    return (
        <div >
            <div className="d-flex flex-row justify-content-between container1">
            <h1 className="h4 flex-item" style={{color: '#475BD8', fontWeight: 'bold'}}>Admin Panel</h1>
            <NavLink className="btn btn-primary px-4 flex-item h-25 mt-4 addEmployee" to="/addEmployee" style={styles.linkButton}> + Add Candidate</NavLink>
            </div>
                    
                    <div className="table-container" style={styles.tableContainer}>
                        <table className="table table-striped" style={styles.table}>
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">National Id</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* we use key to render a unique child */}
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.national_identity}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.department}</td>
                                        <td>{item.position}</td>
                                        <td className="buttons" style={{ padding: '5px' }}>
                                            {item.owner ? (
                                                <>
                                                <button className="btn view" style={{ color: 'green' }}>Update</button>
                                                <button className="btn delete" style={{ color: 'red' }} onClick={() => handleDelete(item._id)}>Delete</button>
                                                </>
                                            ) : (
                                                <>
                                                <button className="btn assign" style={{ color: 'blue' }} onClick={() => handleAssign(item)}> Assign </button>
                                                <button className="btn delete" style={{ color: 'red' }} onClick={() => handleDelete(item._id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination style={styles.pagination}>
                            <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            />
                            {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                            ))}
                            <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            />
                        </Pagination>
            </div>
        </div>
    )
}

const styles = {
    customTextColor:{
        color: '#4BB1B1',
        marginRight: '5px',
        border: '1px solid #4BB1B1',
    },
    linkButton:{
        borderRadious: '40px',
        marginRight: '25px',
        backgroundColor: '#475BD8',
        border: 'none'
    },
    paginationContainer:{
        marginLeft: '30px'
    },
    tableContainer: {
        maxHeight: "400px",
      },
      table: {
        width: '95%'
      },
    pagination:{
        marginLeft: '30px'
    }
}
export default Table;