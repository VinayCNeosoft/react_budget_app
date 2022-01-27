import React,{useState} from 'react'
import PaginationEx from './PaginationEx';
import SocialButton from './SocialButton';


function SocialLogin() {
    const [data,setUserData] = useState()
    const [load,setLoadPost] = useState(false)
    const [checkStat,setStat] = useState(false)

    const handleSocialLogin = (user) => {
        console.log(user);
        setUserData(user._profile)
        setStat(true)
    };
    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    const getLoadPost =() =>{
        setLoadPost(true)
    }
    return (
        <div className="bg-dark ">
            {!data?
            <>
            <h1 className="text-danger"> Log in to Continue...</h1>
            <SocialButton
                className="btn btn-info"
                provider="facebook"
                appId="1529793820711185"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                >
               Continue with Facebook
            </SocialButton>
            <SocialButton className="btn btn-warning"
                provider="google"
                appId="1028422348134-hr5b89lt5q7h2d2155qs2uq8eugrumu3.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                >
                Continue with Google
            </SocialButton> </>:''}
            {data?
            <>
                
                <div className="text-warning">
                <h1>User Data</h1>
                <img src={data.profilePicURL} alt="Check URL"/>
                <h2>First Name : {data.firstName}</h2>
                <h2>Last Name : {data.lastName}</h2>
                </div>
                <button className="btn btn-info" onClick={getLoadPost}>Click To Load Post</button>
                {/* {checkStat?
                <>
                <SocialButton className="btn btn-warning"
                provider="google"
                appId="1028422348134-hr5b89lt5q7h2d2155qs2uq8eugrumu3.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                >
                Continue with Google
                </SocialButton>
                </>:''
                } */}
                {load?
                <>
                <div className="container">
                    <PaginationEx/>
                </div>
                </>:''}
            </>
            :''}
        </div>
    )
}

export default SocialLogin