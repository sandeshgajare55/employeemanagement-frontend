import React, { useRef, useState } from "react";
import Table from "../Component/Table";
import AddUser from "../Component/AddUser";
import UpdateUser from "../Component/UpdateUser";
import DeleteUser from "../Component/DeleteUser";
import axios from "axios";
import toast from "react-hot-toast";


export default function UserTable() {
  const [userId, setUserId] = useState(null);
  const [updatedUserId, setUpdatedUserId] = useState(null);
  const [value, setValue] = useState({
    name: "",
    fathername: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const closeRef = useRef(null);

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!value.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(value.name)) {
      toast.error("Name cannot contain numbers.");
      isValid = false;
    }
    if (!value.fathername.trim()) {
      tempErrors.fathername = "Father Name is required";
      isValid = false;
    } else if (/\d/.test(value.fathername)) {
      toast.error("Father name cannot contain numbers.");
      isValid = false;
    }
    if (!value.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }
    if (!value.phone.trim()) {
      tempErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d+$/.test(value.phone)) {
      tempErrors.phone = "Phone must contain only numbers";
      toast.error(
        "Phone number must contain only digits.",
        "Invalid Phone Number"
      );
      isValid = false;
    } else if (value.phone.length !== 10) {
      tempErrors.phone = "Phone must be a 10-digit number";
      toast.error(
        "Phone number must be a 10-digit number",
        "Invalid Phone Number"
      );
      // alert("ENter Valid phone no")
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const deleteUser = (userid) => {
    setUserId(userid);
  };

  const handleUserDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteuser/${userId}`);
      if (response.data.success) {
        window.location.reload(); 
        toast.success(response.data.message);
        // Fetch data again to reflect changes or update state
       
             }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserData = (Updatedid) => {
    setUpdatedUserId(Updatedid);
  };

  
 const handleOnSubmit = async (e) => {
  e.preventDefault();
  const isValids = validate();
  console.log(isValids);
  if (isValids) {
    try {
        const response = await axios.put(`http://localhost:8000/api/updateuser/${updatedUserId}`, value);
        console.log('User updated successfully:', response.data);
        if (response.data.success || validate()) {
          //toast.success(response.data.message);
          toast.success("Employee Updated");
          CloseRef.current.click();
          window.location.reload();
          // Fetch data again to reflect changes or update state imp
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("An error occurred while updating the user.");
      }
    }
  };
 
  return (
    <>
      <Table DeleteUser={deleteUser} UpdateUser={updateUserData}></Table>
      <AddUser></AddUser>
      <UpdateUser handleOnSubmit={handleOnSubmit} value={value} handleChange={handleChange}></UpdateUser>
      <DeleteUser handleUserDelete={handleUserDelete}></DeleteUser>
      
    </>
  );
}
