import {
    MDBBtn, MDBContainer, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem,
    MDBTabsLink, MDBTabsPane
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { redirect, useNavigate } from 'react-router-dom';
import Appbar from './Appbar';


export default function Signup() {

    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const [userName, setUserName] = React.useState('')
    const [userPassword, setUserPassword] = React.useState('')
    const [userRole, setUserRole] = React.useState('')

    let navigate = useNavigate();
    let userPath = `userpage`;
    let managerPath = `managerpage`;

    const handleClick = async (e) => {
        e.preventDefault()
        const user = { userName, userPassword }
        console.log(user)
        fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then((result) => {
                console.log(result)
                if (result.userRole === "user") {
                    console.log(redirect("userpage"))

                    navigate(userPath);
                }
                else if (result.userRole === "manager") {
                    navigate(managerPath);
                }
                else {
                    console.log("not a valid user role")
                }
            }).catch((error) => {
                console.log("error found " + error)


            })
    }

    const registerClick = async (e) => {
        e.preventDefault()
        const user = { userName, userPassword, userRole }
        console.log(user)
        fetch("http://localhost:8080/User/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log("error found " + error)


            })
    }

    return (

            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>


                        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} />


                        <MDBBtn className="mb-4 w-100" onClick={handleClick}>Sign in</MDBBtn>

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>


                        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />

                        <DropdownButton className="mb-4 w-100" id="dropdown-basic-button" title="roles">
                            <Dropdown.Item
                                onClick={() => setUserRole("user")}>User</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => setUserRole("manager")}>Manager</Dropdown.Item>
                        </DropdownButton>

                        <MDBBtn className="mb-4 w-100" onClick={registerClick}>Sign up</MDBBtn>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
    );
}
