import { useState } from "react";
import {useNavigate} from "react-router-dom"

export const Register = () => {
    const [user,setUser]=useState({
        name:"",
        mobileNumber:"",
        city:"",
        qualification:""
    })
    const navigate=useNavigate();
    const handleInput=(e)=>{
        e.preventDefault();
        console.log("handle Input:-",e);
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value,

        });
        console.log("user:-",user);
    }
    const register=async(e)=>{
        e.preventDefault();
        console.log("Register Button:-",user);
      try{
        let response=await fetch(`http://localhost:8000/contact`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });
        console.log("Response:-",response);
        if(response.ok){
          let resdata= await response.json();
          console.log("Res Data:-",resdata)
          setUser({name:"",mobileNumber:"",city:"",qualification:""})
          alert("Registratin Successfull");
          navigate("/login");
        }else{
          console.log("Failed to register");
        }
    }catch(e){
        console.log("Error aayi h:-",e);
        return{
            error:true,
            details:e
        }
    }
    }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-clos">
              <div className="registration-form">
                <h2 className="main-heading mb-3">Registration Form</h2>
                <br />
                <form>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInput}
                      required
                      id="uername"
                    />
                  </div>
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
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleInput}
                      required
                      id="city"
                    />
                  </div>
                  <div>
                    <label htmlFor="qualification">Qualification:</label>
                    <input
                      type="text"
                      name="qualification"
                      value={user.qualification}
                      onChange={handleInput}
                      required
                      id="qualification"
                    />
                    <br/>
                    <button type="submit" className="btn btn-submit" onClick={register}>Register Here</button>
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
