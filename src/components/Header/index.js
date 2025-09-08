import React, { useEffect } from "react";
import "./style.css";
import {useAuthState} from "react-firebase-hooks/auth"
import {useNavigate } from "react-router-dom";
import {signOut} from "firebase/auth";
import {toast} from "react-toastify";
import {auth} from "../../firebase";
import userSvg from "../../assets/user.svg";
function Header() {
  const[user,loading] = useAuthState(auth);
  const navigate= useNavigate();
  useEffect(()=>{

    if(user){
      navigate("/dashboard")
    }

  },[user,loading]);

 function LogoutFnc(){
    try{
      signOut(auth)
      .then(()=>{
        toast.success("logged Out Successfully")
        navigate("/")
      })
      .catch((error)=>{
         toast.error(error.message)
      })
    }catch(e){
      toast.error(e.message);
    }
 }

  return (
    <div className="navbar">
      <p className="logo">Financly.</p>
            {user ? (
        <p className="navbar-link" onClick={LogoutFnc}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          Logout
        </p>
      ) : (
        <></>
      )}
     </div>
  );
}

export default Header;
