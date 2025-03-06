import {Heading} from "../Components/Heading"
import {SubHeading} from "../Components/SubHeading"
import {InputBox} from "../Components/InputBox"
import {Button} from "../Components/Button"
import {BottomWarning} from "../Components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Signin(){
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const userData ={
            username,
            password
        }

        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", userData);
            localStorage.setItem("token", response.data.token);
            if(response.status == 200){
                alert("Sign In Successfull!!");
                navigate("/dashboard");
            }
            else{
                alert("Invalid Credentials");
            }
        }
        catch(error){
            alert("Invalid Credentials!!")
            console.log(error);
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-70 p-2 px-4 h-max text-center">
                <Heading label="Sign In"/>
                <SubHeading label="Enter your credentials to access your account"/>
                <InputBox label="Email" onChange={setusername} type="text"/>
                <InputBox label="Password" onChange={setpassword} type="password"/>
                <Button label="Sign In" onClick={handleSubmit}/>
                <BottomWarning label="Don't have an account?" buttontext="Sign Up" to="/signup"/>
            </div>
        </div>
    </div>
}