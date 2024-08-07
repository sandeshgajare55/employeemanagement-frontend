import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Table({ DeleteUser, UpdateUser }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getuser");
        setData(response.data.user || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


 
  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Manage <b>Employees</b>
              </h2>
            </div>
            <div className="col-sm-6">
              <a
                href="#"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#addEmployeeModal"
              >
                <i className="material-icons">&#xE147;</i>{" "}
                <span>Add New Employee</span>
              </a>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem) => (
              <tr key={elem._id}>
                <td></td>
                <td>{elem.name}</td>
                <td>{elem.fathername}</td>
                <td>{elem.email}</td>
                <td>{elem.phone}</td>
                <td>
                  <a
                    href="#"
                    className="edit cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#editEmployeeModal"
                    onClick={() => UpdateUser(elem._id)}
                  >
                    <i
                      className="material-icons"
                      data-bs-toggle="tooltip"
                      title="Edit"
                    >
                      &#xE254;
                    </i>
                  </a>
                  <a
                    href="#"
                    className="delete cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEmployeeModal"
                    onClick={() => DeleteUser(elem._id)}
                  >
                    <i
                      className="material-icons"
                      data-bs-toggle="tooltip"
                      title="Delete"
                    >
                      &#xE872;
                    </i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
