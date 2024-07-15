import React, { useState } from 'react'

export default function UpdateUser({ handleOnSubmit, value, handlechange }) {
    function phoneno() {
        $('#mobile_number').keypress(function (e) {
            var a = [];
            var k = e.which;
    
            for (i = 48; i < 58; i++)
                a.push(i);
    
            if (!(a.indexOf(k) >= 0))
                e.preventDefault();
        });
    }
    return (
        <>


            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleOnSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Update Existing User</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={value.name} name='name' onChange={handlechange} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Father Name</label>
                                    <input type="text" value={value.fathername} name='fathername' onChange={handlechange} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" value={value.email} name='email' onChange={handlechange} className="form-control" />

                                </div>
                                <div className="form-group">
                                    <label>Phone</label>

                                    <input type="text" value={value.phone} name='phone' onChange={phoneno} className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-primary" value="Update" data-bs-dismiss="modal" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}