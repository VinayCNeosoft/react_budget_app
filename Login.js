import { TextField, Box, Button, Typography, Link} from '@mui/material'
import bggg from '../../src/images/bgggg.jpg'
import {useNavigate} from "react-router-dom";
import React, {useState, useRef,useEffect} from 'react'
import axios from 'axios'

const URL = 'http://localhost:3001/user';

const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})');

const styles = {
    boxContainer: {
        backgroundImage: `url(${bggg})`
    },    
};

function Login() {
    const [user,setUser]=useState()

    const [email,setEmail] = useState()
    let [password,setPassword] = useState()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [eemail,setEemail] = useState('')
    const [epassword,setEpassword] = useState('')

    const navigate = useNavigate();

    const getData = () =>{
        axios.get(URL)
        .then((res)=>{
            const myRepo = res.data;
            setUser(myRepo);
            console.log(myRepo)
        }
        );
    };
    useEffect(()=>
    getData(),
    [])

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
                navigate('/dash');
            }
            else{
                alert("User does not exist !")
            }           
        }
        else{
            alert("Falied to Login")
        }
    }

    return (
        <>
        <Box sx={{marginTop:5,marginLeft:30, marginRight:30, width:"auto"}} container spacing={0} direction="column" alignContent="center" alignItems="center" style={styles.boxContainer}><br/> <br/>
            <Typography textAlign="center" variant="h4">Login</Typography>
            <Box>
                <TextField sx={{ mt:2, mx:2}} type="email" variant="outlined" color="secondary" label="Email" name="email" onChange={handler} error={eemail===''?'':'error'} inputRef={emailRef} helperText={eemail}/><br/>
                <TextField sx={{ mt:2, mx:2}} type="password" variant="outlined" color="secondary" label="Password" name="password" onChange={handler} error={epassword===''?'':'error'} inputRef={passwordRef} helperText={epassword}/><br/>
            </Box><br/>
            <Link sx={{mr:5,mb:3}} variant="text" color="black" underline="none" href="/register">New User? Sign Up</Link>
            <Button onClick={formSubmit} sx={{mr:5, mb:3}} variant="contained" color="success">Login</Button><br/><br/><br/> 
        </Box>
        </>
    )
}

export default Login