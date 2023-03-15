/**
 * Update User Details Form
 */
import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

const UpdateUserForm = ({ user, onChangeAddNewUserDetails , addNewUserDetails}) => (
  <Form>
   
    <FormGroup>
      <Label for="firstName">First Name</Label>
      <Input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Enter First Name"
        value={addNewUserDetails.firstname}
        onChange={(e) => onChangeAddNewUserDetails('firstname', e.target.value)}
        />
    </FormGroup>
    <FormGroup>
      <Label for="lastName">Last Name</Label>
      <Input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Enter Last Name"
        value={addNewUserDetails.lastname}
        onChange={(e) => onChangeAddNewUserDetails('lastname', e.target.value)}
        />
    </FormGroup>
    <FormGroup>
            <Label for="Contact">Contact Number</Label>
            <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter Contact Number"
                value={addNewUserDetails.mobilenumber}
                onChange={(e) => onChangeAddNewUserDetails('mobilenumber', e.target.value)}
            />
        </FormGroup>
  </Form>
)

export default UpdateUserForm
