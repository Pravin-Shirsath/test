/**
 * Add New User Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const AddNewAdminForm = ({ addNewUserDetails, onChangeAddNewUserDetails }) => (
    <Form className='addNewCustomerForm'>
        <FormGroup>
            <Label className='w-25' for="userName">Username</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Username"
                className='w-75'
                value={addNewUserDetails.username}
                onChange={(e) => onChangeAddNewUserDetails('username', e.target.value)}
            />
        </FormGroup> 
        <FormGroup className='d-flex justify-content-between'>
            <Label className='w-25' for="userEmail">Email</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Email"
                className='w-75'
                value={addNewUserDetails.email}
                onChange={(e) => onChangeAddNewUserDetails('email', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label className='w-25' for="firstName">First Name</Label>
            <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                className='w-75'
                value={addNewUserDetails.first_name}
                onChange={(e) => onChangeAddNewUserDetails('first_name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label className='w-25' for="lastName">Last Name</Label>
            <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                className='w-75'
                value={addNewUserDetails.last_name}
                onChange={(e) => onChangeAddNewUserDetails('last_name', e.target.value)}
            />
        </FormGroup>
        <FormGroup className='d-flex justify-content-between'>
            <Label className='w-25' for="mobilenumber">Contact Number</Label>
            <Input
                type="number"
                name="mobilenumber"
                id="mobilenumber"
                placeholder="Enter Contact Number"
                className='w-75'
                value={addNewUserDetails.mobile_number}
                onChange={(e) => onChangeAddNewUserDetails('mobile_number', e.target.value)}
            />
        </FormGroup>
    </Form>
);

export default AddNewAdminForm;

