import { TextField, Box, Button, Typography, Link} from '@mui/material'
// import loginImg from '../../src/images/reg.png'
// import bggg from '../../src/images/b.jpg'
import bggg from '../../src/images/bgggg.jpg'
import React, {useState, useRef, useEffect} from 'react'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios'
import {useNavigate} from "react-router-dom";


const URL = 'http://localhost:3001/user'

const RegForName = RegExp('[a-zA-Z ]{2,100}');
const RegForUsername = RegExp('^[a-zA-Z0-9]{6,20}$');
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})');

const styles = {
    boxContainer: {
        backgroundImage: `url(${bggg})`
    },
  };

function Register() {
    const [full_name,setName] = useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()

    const captchaRef = useRef()
    const full_nameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [efull_name,setEname] = useState('')
    const [eusername,setEusername] = useState('')
    const [eemail,setEemail] = useState('')
    const [epassword,setEpassword] = useState('')
    const [eConfirmPassword,setEConfirmPassword] = useState('')

    const navigate = useNavigate();

    const handler = (event) =>{
        // console.log(full_name)
        // console.log(username)
        // console.log(email)
        // console.log(password)
        // console.log(confirmPassword)

        let fieldname = event.target.name
        switch(fieldname){
            case 'full_name':
                setEname(RegForName.test(full_nameRef.current.value)?'':'Please enter Full Name')
                setName(full_nameRef.current.value)
                // console.log(full_name)
                break

            case 'username':
                setEusername(RegForUsername.test(usernameRef.current.value)?'':'Please enter Username of atleast 6 characters')
                setUsername(usernameRef.current.value)
                // console.log(username)
                break

            case 'email':
                setEemail(RegForEmail.test(emailRef.current.value)?'':'Please enter correct Email format ')
                setEmail(emailRef.current.value)
                // console.log(email)
                break

            case 'password':
                setEpassword(RegForPassword.test(passwordRef.current.value)?'':"Please enter Password in correct format")
                setPassword(passwordRef.current.value)
                // console.log(password)
                break

            case 'confirmPassword':
                setEConfirmPassword(password === confirmPasswordRef.current.value?'':"Password and Confirm Password should match")
                setConfirmPassword(confirmPasswordRef.current.value)
                // console.log(confirmPassword)
                break
            default:
                break;

        }
        console.log(full_name)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
    }

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const formSubmit= () =>{
        if (validateCaptcha(captchaRef.current.value)===true) {
            if(efull_name==='' && eusername==='' && eemail==='' && epassword==='' && eConfirmPassword===''){
                    let formData = {"full_name":full_name,  "username":username,"email":email, "password":password,"confirmPassword":confirmPassword}
                    axios.post(URL,formData)
                    .then(()=>{
                        alert("Successfully Registered")
                        full_nameRef.current.value=''
                        usernameRef.current.value=''
                        emailRef.current.value=''
                        passwordRef.current.value=''
                        confirmPasswordRef.current.value=''
                        captchaRef.current.value=''
                        console.log(full_name)
                        console.log(username)
                        console.log(email)
                        console.log(password)
                        console.log(confirmPassword)
                        navigate("/")
                    })

            }else{
                alert('Login Failed!!!')
            }

        }

        else {
            alert('Captcha Does Not Match');
            captchaRef.current.value=''
        }
    }



    return (
        <>
        <Box sx={{marginTop:5,marginLeft:30, marginRight:30, width:"auto"}} container spacing={0} direction="column" alignContent="center" alignItems="center" style={styles.boxContainer}><br/>
            <Typography textAlign="center" variant="h4">Register</Typography>
            {/* <Box >
                <img sx={{width:40,height:40}} src={loginImg} alt="login-img"/>
            </Box><br/> */}
            <Box>
                <TextField sx={{ mt:2, mx:2}} type="text" variant="outlined" color="secondary" label="Full Name" name="full_name" onChange={handler} error={efull_name===''?'':'error'} inputRef={full_nameRef} helperText={efull_name}/><br/>
                <TextField sx={{ mt:2, mx:2}} type="text" variant="outlined" color="secondary" label="Username" name="username" onChange={handler} error={eusername===''?'':'error'} inputRef={usernameRef} helperText={eusername} /><br/>
                <TextField sx={{ mt:2, mx:2}} type="email" variant="outlined" color="secondary" label="Email" name="email" onChange={handler} error={eemail===''?'':'error'} inputRef={emailRef} helperText={eemail}/><br/>
                <TextField sx={{ mt:2, mx:2}} type="password" variant="outlined" color="secondary" label="Password" name="password" onChange={handler} error={epassword===''?'':'error'} inputRef={passwordRef} helperText={epassword}/><br/>
                <TextField sx={{ mt:2, mx:2}} type="password" variant="outlined" color="secondary"label="Confirm Password" name="confirmPassword" onChange={handler} error={eConfirmPassword===''?'':'error'} inputRef={confirmPasswordRef} helperText={eConfirmPassword}/><br/>
                
                <Box sx={{mt:2, ml:2}}><LoadCanvasTemplate variant="outlined" /></Box><br/>
                <TextField sx={{ mt:2, mx:2}} variant="outlined" color="secondary" label="Captcha" inputRef={captchaRef} /><br/>

            </Box><br/>
            <Link sx={{mr:5,mb:3}} underline="none" color="black" variant="text" href="/">Already a User? Sign in</Link>
            <Button onClick={formSubmit} sx={{mr:5, mb:3}} variant="contained" color="success">Register</Button>
        </Box>
        </>
    )
}

export default Register