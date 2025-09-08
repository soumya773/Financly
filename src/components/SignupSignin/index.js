import React, { useState } from "react";
import './style.css'
import Button from '../Button'
import Input from '../input'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth,db, provider} from "../../firebase"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const SignupSigninComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginform,setLoginForm] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail(){
  console.log("Name",name)
  console.log("email",email)
  console.log("password",password)
  console.log("confirmpassword",confirmPassword)

  if(name!="" && password!="" && confirmPassword!=""){
   if(password== confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 

    const user = userCredential.user;
    console.log("user>>>", user)
    toast.success("User Created")
    setLoading(false)
    setConfirmPassword("");
    setEmail("");
    setName("");
    setPassword("");
    createDoc(user)
    navigate("/dashboard")

    // createDoc(user);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    setLoading(false)
    // ..
  });
   }else{
    toast.error("Password and Confirm Password don");
    setLoading(false)
   }
    

  }else{
    toast.error("All field are mandetory!")
    setLoading(false);
  }
  
}  
function loginUsingEmail(){
  console.log("Email",email)
  console.log("password",password)
  setLoading(true)

    if(email!="" && password!="" ){
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!");
    console.log("User Logged in",user)
    setLoading(false)
    navigate("/dashboard")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false)
    toast.error(errorMessage);
  });

}else{
      toast.error("All fields are mandatory!");
      setLoading(false)
    }

} 
 async function createDoc(user){
  setLoading(true)
   if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
  try{
    await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL:user.photoURL ? user.photoURL : "",
          createdAt:new Date(),
        });
        toast.success("Doc created")
        setLoading(false)
  }catch(e){
    toast.error(e.message);
    setLoading(false)
  }
} else{
  // toast.error("Doc already exists")
  setLoading(false)
} 
}
function googleAuth(){
  setLoading(true)
  try{
     signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user>>>",user)
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("User authenticated")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    setLoading(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
  });
  }catch(e){
    setLoading(false)
    toast.error(e.message)
  }
  
} 
  
  return (
    <>
    {loginform?
    <div className='signup-wrapper'>
      <h2 className='title'> 
        Login on <span style={{color:"var(--theme)"}}>Financely</span>
    </h2> 
    <form>

         <Input
         type="email"
        lable={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}
        />
         <Input
         type="password"
        lable={"Password"}
        state={password}
        setState={setPassword}
        placeholder={"Example@123"}
        />
        
        <Button 
        disabled={loading}
        text={loading ? "Loading...":"Login Using Email and Password"}
        onClick={loginUsingEmail}
        />
        <p className="p-login">or</p>
        <Button 
        onClick={googleAuth}
        text={loading ? "Loading...":"Login Using Google"} 
        blue={true}
        
        />
        <p className="p-login" 
        style={{cursor:"pointer"}}
        onClick={()=> setLoginForm(!loginform)}>Or Don't  Have An Account Already? Click Here</p>
        
        
    </form> 
    
    </div>
    :<div className='signup-wrapper'>
      <h2 className='title'> 
        sign Up on <span style={{color:"var(--theme)"}}>Financely</span>
    </h2> 
    <form>

        <Input
        lable={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"John Doe"}
        />
         <Input
         type="email"
        lable={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}
        />
         <Input
         type="password"
        lable={"Password"}
        state={password}
        setState={setPassword}
        placeholder={"Example@123"}
        />
         <Input
         type="password"
        lable={"Confirm Password"}
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Example@123"}
        />
        <Button 
        
        disabled={loading}
        text={loading ? "Loading...":"Signup Using Email and Password"}onClick={signupWithEmail}/>
        <p className="p-login">or</p>
        <Button 
        onClick={googleAuth}
        text={loading ? "Loading...":"Signup Using Google"} blue={true}/>
        <p className="p-login" 
        style={{cursor:"pointer"}}
        onClick={()=> setLoginForm(!loginform)}
        >Or Have An Account Already? Click Here</p>
        
    </form> 
    
    </div> }
    
    </>
  )
}

export default SignupSigninComponent
