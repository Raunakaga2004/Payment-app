import { useEffect, useState } from "react";
import { AppBar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import axios from "axios";

export function Dashboard(){
    const [user, setUser] = useState({});
    console.log(user)

    useEffect(()=>{
        const fetchuser = async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/user/getuser",{
                headers:{
                    Authorization : localStorage.getItem("token")
                }
            })
            // console.log(response.data);
            setUser(response.data);
        }
        fetchuser();
    },[])

    return <div className="px-10 py-4">
        <AppBar firstname={user.firstname || "guest"} lastname={user.lastname || ""}></AppBar>
        <Balance></Balance>
        <Users id={user.id}></Users>
    </div>
}