import { useState } from "react";
import axios from 'axios'
// import { login } from "../../../server/auth-controller/controller";

export const Login = () => {
  const [user, setUser] = useState({
    mobileNumber: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async(e) => {
    e.preventDefault();
    console.log("logIn");
    console.log("User input:-", user);

    // let obj={
    //   mobileNumber:user.mobileNumber,
    //   password:user.password
    // }
    // console.log("Obj:-",obj)
    // const axios = require("axios");

    try{
      let response=await fetch(`http://localhost:8000/login`,{
          method:'POST',
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(user)
      });
      console.log("Response:-",response);
      if(response.ok){
        let res_data= await response.json();
        console.log("Response Data in JSON:-",res_data)
        localStorage.setItem('token',res_data.token);     //stored the token into the local storage
        setUser({mobileNumber:"",password:""});
      }else{
        console.log("Incorrect Credentials");
      }
      
    }catch(e){
      console.log(e);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-clos">
              <div className="registration-form">
                <h2 className="main-heading mb-3">Login Here</h2>
                <br />
                <form>
                  <div>
                    <label htmlFor="mobileNumber">Contact No:</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={user.mobileNumber}
                      onChange={handleInput}
                      required
                      id="mobileNumber"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      required
                      id="password"
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-submit"
                      onClick={login}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
