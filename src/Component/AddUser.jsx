import React, { useRef, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';



export default function AddUser() {
    const [value, setValue] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: ""
    });

    const [errors, setErrors] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: ''
    });

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!value.name.trim()) {
            tempErrors.name = 'Name is required';
            isValid = false;
        }
        if (!value.fathername.trim()) {
            tempErrors.fathername = 'Father Name is required';
            isValid = false;
        }
        if (!value.email.trim()) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }
        if (!value.phone.trim()) {
            tempErrors.phone = 'Phone is required';
            isValid = false;
          } else if (!/^\d+$/.test(value.phone)) {
            tempErrors.phone = 'Phone must contain only numbers';
            isValid = false;
          } else if (value.phone.length !== 10) {
            tempErrors.phone = 'Phone must be a 10-digit number';
            isValid = false;
          }

        setErrors(tempErrors);
        return isValid;
    };

    const CloseRef = useRef()
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const adduser = await axios.post('http://localhost:8000/api/create', value)
            const response = adduser.data
            if (response.success||validate()) {
                toast.success(response.Message,'Employee Added ')
                CloseRef.current.click()

            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        location.reload()

    };
    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true" ref={CloseRef}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={value.name} name='name' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Father Name </label>
                                    <input type="text" value={value.fathername} name='fathername' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={value.email} name='email' onChange={handleOnChange} className="form-control" required />

                                </div>
                                <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name="phone" id="phone" value={value.phone} onChange={handleOnChange} className="form-control" required aria-describedby="phoneHelp"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-primary" value="Add" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}