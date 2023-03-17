/**
 * Add New User Form
 */
 import React from 'react';
 import { Form, FormGroup, Label, Input } from 'reactstrap';
 
 const AddNewUserForm = ({ addNewUserDetails, onChangeAddNewUserDetails }) => (
     <Form className='addNewCustomerForm'>
         <FormGroup>
             <Label for="userName">Username</Label>
             <Input
                 type="text"
                 name="userName"
                 id="userName"
                 placeholder="Enter Username"
                 value={addNewUserDetails.name}
                 onChange={(e) => onChangeAddNewUserDetails('username', e.target.value)}
             />
         </FormGroup>
         <FormGroup>
             <Label for="userEmail">Email</Label>
             <Input
                 type="email"
                 name="userEmail"
                 id="userEmail"
                 placeholder="Enter Email"
                 value={addNewUserDetails.email}
                 onChange={(e) => onChangeAddNewUserDetails('email', e.target.value)}
             />
         </FormGroup>
         <FormGroup>
             <Label for="firstName">First Name</Label>
             <Input
                 type="text"
                 name="firstName"
                 id="firstName"
                 placeholder="Enter First Name"
                 value={addNewUserDetails.first_name}
                 onChange={(e) => onChangeAddNewUserDetails('first_name', e.target.value)}
             />
         </FormGroup>
         <FormGroup>
             <Label for="lastName">Last Name</Label>
             <Input
                 type="text"
                 name="lastName"
                 id="lastName"
                 placeholder="Enter Last Name"
                 value={addNewUserDetails.last_name}
                 onChange={(e) => onChangeAddNewUserDetails('last_name', e.target.value)}
             />
         </FormGroup>
    
         <FormGroup>
             <Label for="Contact">Contact Number</Label>
             <Input
                 type="number"
                 name="mobile"
                 id="mobile"
                 placeholder="Enter Contact Number"
                 value={addNewUserDetails.mobile_number}
                 onChange={(e) => onChangeAddNewUserDetails('mobile_number', e.target.value)}
             />
         </FormGroup>
         
         
         
     </Form>
 );
 
 export default AddNewUserForm;
 