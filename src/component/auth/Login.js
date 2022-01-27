import { TextField, Box, Button, Typography, Link} from '@mui/material';
import {useNavigate} from "react-router-dom";
import React, {useState, useRef,useEffect} from 'react'
import axios from 'axios'
import SocialButton from './SocialButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';

const URL = 'http://localhost:3001/user';

const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})');

const styles = {
    boxContainer: {
        backgroundColor:`#6DD5FA`,
        borderRadius:100
    },
};

function Login() {
    const [user,setUser]=useState()

    const [email,setEmail] = useState()
    let   [password,setPassword] = useState()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [eemail,setEemail] = useState('')
    const [epassword,setEpassword] = useState('')

    const navigate = useNavigate();

    const handleSocialLogin = (user) => {
        console.log(user);
        navigate('/home');
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    
    useEffect(()=>{
        if(localStorage.getItem("status")==="isLogged"){
            navigate("/home")
        }
        else{
            localStorage.setItem("status",null)
            navigate("/log")
            
                axios.get(URL)
                .then((res)=>{
                    const myRepo = res.data;
                    setUser(myRepo);
                    console.log(myRepo)
                }
                );
        }
    },[navigate])

    const handler = (event) =>{
        let fieldname = event.target.name
        switch(fieldname){
            case 'email':
                setEemail(RegForEmail.test(emailRef.current.value)?'':'Please enter correct Email format ')
                setEmail(emailRef.current.value)
                break
            case 'password':
                setEpassword(RegForPassword.test(passwordRef.current.value)?'':"Please enter Password in correct format")
                setPassword(passwordRef.current.value)
                break
            default:
                break;
        }
    }
    const formSubmit= () =>
    {
        if(eemail==='' && epassword==='')
        {
            if(user.some(user=>user.email===email && user.password===password)){
                let id = user.findIndex(i=>i.email===email)
                id=parseInt(id)+1
                setPassword=user[id-1].password
                localStorage.setItem("status","isLogged")
                localStorage.setItem("id",id)
                localStorage.setItem("email",email)
                localStorage.setItem("password",password)
                alert("Successfully Login")
                navigate('/home');
            }
            else{
                alert("User does not exist !")
            }
        }
        else{
            alert("Failed to Login")
        }
    }

    return (
        <>
        <Box sx={{marginTop:20,marginLeft:30, marginRight:30, width:"auto"}} container spacing={0} direction="column" alignContent="center" alignItems="center" style={styles.boxContainer}><br/> <br/>
            <Typography textAlign="center" variant="h4" color="black">Login</Typography>
            <Box>
                <TextField sx={{ mt:2, ml:20, mr:20, width:300}} type="email" variant="outlined" color="secondary" label="Email" name="email" onChange={handler} error={eemail===''?'':'error'} inputRef={emailRef} helperText={eemail}/><br/>
                <TextField sx={{ mt:2, ml:20, mr:20, width:300}} type="password" variant="outlined" color="secondary" label="Password" name="password" onChange={handler} error={epassword===''?'':'error'} inputRef={passwordRef} helperText={epassword}/><br/>
            </Box><br/>
            <Link sx={{ mt:2, ml:10, width:100}} variant="text" color="black" underline="none" href="/">New User? Sign Up</Link>
            <Button onClick={formSubmit} sx={{  ml:10, mr:10, width:100}}variant="contained" color="success">Login</Button><br/>

            <SocialButton
                className="btn btn-primary"
                provider="facebook"
                appId="1529793820711185"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}

                >Continue with <FacebookTwoToneIcon/>
            </SocialButton>
            <SocialButton className="btn btn-warning"
                provider="google"
                appId="1028422348134-hr5b89lt5q7h2d2155qs2uq8eugrumu3.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                >Continue with Google <GoogleIcon/>
            </SocialButton><br/><br/>
        </Box>
        </>
    )
}

export default Login