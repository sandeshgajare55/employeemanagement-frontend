import React, { useState } from 'react'
import Table from '../Component/Table'
import AddUser from '../Component/AddUser'
import UpdatedUser from '../Component/UpdateUser'
import DeleteUser from '../Component/DeleteUser'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function UserTable() {
    const [userId, setUserId] = useState()
    const [updatedUserId, setUpdatedUserId] = useState()
    console.log(updatedUserId)
    const [value, setValue] = useState({
        name: "",
        fathername: "",
        email: "",
        phone: ""
    })
    const deleteuser = (userid) => {
        setUserId(userid)
    }
    const handleUserDelete = async () => {
        try {
            const DeleteUser = await axios.delete(`http://localhost:8000/api/deleteuser/${userId}`)
            const response = DeleteUser.data
            if (response.success) {
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
        location.reload()
    }

    const handlechange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

    }


    const UpdateUserData = (Updatedid) => {

        setUpdatedUserId(Updatedid)

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const UpdatedUser = await axios.put(`http://localhost:8000/api/updateuser/${updatedUserId}`,value)
            const response = UpdatedUser.data

            if (response.success) {
                toast.success(response.message)
            }
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
        location.reload()
        // console.log(value)
    }
    return (
        <>
            <Table DeleteUser={deleteuser} UpdatedUser={UpdateUserData}></Table>
            <AddUser></AddUser>
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} handlechange={handlechange}></UpdatedUser>
            <DeleteUser handleUserDelete={handleUserDelete} ></DeleteUser>




        </>
    )
}