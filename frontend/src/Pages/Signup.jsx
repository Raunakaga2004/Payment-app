import {Heading} from "../Components/Heading"
import {SubHeading} from "../Components/SubHeading"
import {InputBox} from "../Components/InputBox"
import {Button} from "../Components/Button"
import {BottomWarning} from "../Components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export function Signup(){
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        // console.log("submit")
        // e.preventDefault();

        const userData = {
            firstname,
            lastname,
            username,
            password
        }

        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', userData);
            localStorage.setItem("token", response.data.token);
            if(response.status == 200){
                alert("Sign up successfull!!");
                navigate("/dashboard");
            }
            else{
                alert("Error");
            }
        }
        catch(error){
            alert(error.response.data.message)
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-70 p-2 px-4 h-max text-center">
                <Heading label = "Sign Up"/>
                <SubHeading label = "Enter your information to create an account"/>
                <InputBox label = "First Name" onChange ={setfirstname}/>
                <InputBox label = "Last Name" onChange ={setlastname}/>
                <InputBox label = "Email Address" onChange ={setusername}/>
                <InputBox label = "Password" onChange ={setpassword} type="password"/>
                <Button label="Sign Up" onClick={handleSubmit}/>
                <BottomWarning label="Already have an account?" buttontext="SignIn" to="/signin"/>
            </div>
        </div>
    </div>
}