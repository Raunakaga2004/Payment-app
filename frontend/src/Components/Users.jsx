import { useEffect, useState } from "react"
import { User } from "./User"
import axios from "axios"

export function Users(props){
    const [text, settext] = useState("")

    const [users, setusers] = useState([{
        id : 1,
        firstname : "guest",
        lastname : "",
    }])

    useEffect(()=>{
        async function fetchusers(){
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=");
            const users = response.data.users;
            setusers(users);
        }
        fetchusers();
    },[])

    return <div className="px-4 py-4">
        <div className="font-semibold text-sm">Users</div>
        <div className="py-4">
            <input className="w-full border rounded-md text-xs px-2 py-1" onChange={(e)=>settext(e.target.value)}></input>
        </div>
        <div>
            {users
                .filter((user) => (user.firstname.includes(text) || user.lastname.includes(text)) && user.id!=props.id)
                .map((user) => (
                    <User  key={user.id} id={user.id} firstname={user.firstname} lastname={user.lastname} />
            ))}
        </div>
    </div>
}