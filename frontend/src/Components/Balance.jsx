import { useEffect, useState } from "react";
import axios from "axios";

export function Balance(){
    const [balance, setbalance] = useState("₹0");

    useEffect(()=>{
        const getBalance = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization : localStorage.getItem("token")
                }
            })
            setbalance(response.data.balance);
        }
        getBalance();
    },[])

    return <div>
        <div className="text-sm font-semibold px-4">Your Balance : {balance}</div>
    </div>
}