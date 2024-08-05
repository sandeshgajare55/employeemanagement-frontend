
import React, { useEffect,useState,useRef } from 'react'
import Table from './Table';
export default function UpdateUser({handleOnSubmit,value, handleChange}) {

  // const upUser = ({ userId }) => {
  //   const [user, setUser] = useState({
  //     name: "",
  //     fathername: "",
  //     email: "",
  //     phone: "",
  //   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//         ...prevUser,
//         [name]: value
//     }));
// };




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


// To Get preffetch value I have to build a api getuser:id 
//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/getuser/${userId}`);
//             setUser(response.data);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     fetchData();
// }, [userId]);

// Use this Logic there in UserTable.jsx

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//       await axios.put(`http://localhost:8000/api/update/${userId}`, user);
//       console.log('User updated successfully');
//   } catch (error) {
//       console.error('Error updating user:', error);
//   }
// };



  const CloseRef = useRef();
  return (
    <>
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleOnSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Update Existing User</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                  ref={CloseRef}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={value.name}
                    name="name"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Father Name</label>
                  <input
                    type="text"
                    value={value.fathername}
                    name="fathername"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={value.email}
                    name="email"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="number"
                    value={value.phone}
                    name="phone"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  value="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Update"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
