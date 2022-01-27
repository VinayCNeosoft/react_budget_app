import { TextField, Box, Button, Typography, Link} from '@mui/material'
import React, {useState, useRef,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const URL = 'http://localhost:3001/user'

const RegForName = RegExp('[a-zA-Z ]{2,100}');
const RegForUsername = RegExp('^[a-zA-Z0-9]{6,20}$');
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})');

const styles = {
    boxContainer: {
        backgroundColor:`#6DD5FA`,
        borderRadius:80
    },
};

function Register() {
    const [firstname,setFName] = useState()
    const [lastname,setLName] = useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()

    const fnameRef = useRef()
    const lnameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()


    const [efirstname,setEFname] = useState('')
    const [elastname,setELname] = useState('')
    const [eusername,setEusername] = useState('')
    const [eemail,setEemail] = useState('')
    const [epassword,setEpassword] = useState('')
    const [eConfirmPassword,setEConfirmPassword] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("status")==="isLogged"){
            navigate("/home")
        }
        else{
            localStorage.setItem("status",null)
            navigate("/")
        }
    })

    const handler = (event) =>{
        let fieldname = event.target.name
        switch(fieldname){
            case 'firstname':
                setEFname(RegForName.test(fnameRef.current.value)?'':'Please enter First Name')
                setFName(fnameRef.current.value)
                break
            case 'lastname':
                setELname(RegForName.test(lnameRef.current.value)?'':'Please enter Last Name')
                setLName(lnameRef.current.value)
                break
            case 'username':
                setEusername(RegForUsername.test(usernameRef.current.value)?'':'Please enter Username of at least 6 characters')
                setUsername(usernameRef.current.value)
                break
            case 'email':
                setEemail(RegForEmail.test(emailRef.current.value)?'':'Please enter correct Email format ')
                setEmail(emailRef.current.value)
                break
            case 'password':
                setEpassword(RegForPassword.test(passwordRef.current.value)?'':"Please enter Password in correct format")
                setPassword(passwordRef.current.value)
                break
            case 'confirmPassword':
                setEConfirmPassword(password === confirmPasswordRef.current.value?'':"Password and Confirm Password should match")
                setConfirmPassword(confirmPasswordRef.current.value)
                break
            default:
            break;
        }
        /*
        console.log(firstname)
        console.log(lastname)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        */
    }

    const formSubmit= () =>{
            if(efirstname==='' && elastname==='' && eusername==='' && eemail==='' && epassword==='' && eConfirmPassword===''){
                    let formData = {"firstname":firstname,"lastname":lastname,  "username":username,"email":email, "password":password,"confirmPassword":confirmPassword}
                    axios.post(URL,formData)
                    .then(()=>{
                        alert("Successfully Registered")
                        fnameRef.current.value=''
                        lnameRef.current.value=''
                        usernameRef.current.value=''
                        emailRef.current.value=''
                        passwordRef.current.value=''
                        confirmPasswordRef.current.value=''

                        console.log(firstname)
                        console.log(lastname)
                        console.log(username)
                        console.log(email)
                        console.log(password)
                        console.log(confirmPassword)
                        navigate("/")
                    })

            }
            else
            {
                alert('Login Failed!!!')
            }
        }



    return (
        <>
        <br/>
        <br/>
        <br/>
        <Box sx={{marginLeft:30, marginRight:30,marginBottom:0, width:"auto"}} container spacing={0} direction="column" alignContent="center" alignItems="center" style={styles.boxContainer}><br/>
            <Typography textAlign="center" variant="h4" color='black'>Register</Typography>
            {/* <Box >
                <img sx={{width:40,height:40}} src={loginImg} alt="login-img"/>
            </Box><br/> */}
            <Box>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}}  type="text" variant="outlined" color="secondary" label="First Name" name="firstname" onChange={handler} error={efirstname===''?'':'error'} inputRef={fnameRef} helperText={efirstname}/><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}} type="text" variant="outlined" color="secondary" label="Last Name" name="lastname" onChange={handler} error={elastname===''?'':'error'} inputRef={lnameRef} helperText={elastname}/><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}} type="text" variant="outlined" color="secondary" label="Username" name="username" onChange={handler} error={eusername===''?'':'error'} inputRef={usernameRef} helperText={eusername} /><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}} type="email" variant="outlined" color="secondary" label="Email" name="email" onChange={handler} error={eemail===''?'':'error'} inputRef={emailRef} helperText={eemail}/><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}} type="password" variant="outlined" color="secondary" label="Password" name="password" onChange={handler} error={epassword===''?'':'error'} inputRef={passwordRef} helperText={epassword}/><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:400}} type="password" variant="outlined" color="secondary"label="Confirm Password" name="confirmPassword" onChange={handler} error={eConfirmPassword===''?'':'error'} inputRef={confirmPasswordRef} helperText={eConfirmPassword}/><br/>
            </Box><br/>
            <Link sx={{mr:5,mb:3}} underline="none" color="black" variant="text" href="/log">Already a User? Sign in</Link>
            <Button onClick={formSubmit} sx={{mr:5, mb:3}} variant="contained" color="success">Register</Button>
        </Box>
        </>
    )
}

export default Register