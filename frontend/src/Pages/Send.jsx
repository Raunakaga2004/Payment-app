import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { Button } from "../Components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Send(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const fn = searchParams.get("fn");
    const ln = searchParams.get("ln");

    const firstname = fn;
    const lastname = ln;

    const [amount, setamount] = useState(0);

    const navigate = useNavigate();

    const handleClick = async ()=>{
        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
            "amount" : amount,
            "to" : id
        },{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data);
            alert("Money sent");
            navigate("/dashboard")
        })
        .catch((error) => {
            console.error(error);
            alert("Error");
        });
    }

    return <div className="h-screen flex flex-col justify-center bg-slate-100">
        <div className="flex justify-center">
            <div className="bg-white p-4 rounded-md w-60 text-center">
                <Heading label={"Send Money"}></Heading>
                <div className="text-md flex gap-4 items-center pt-6 pb-4">
                    <div className="rounded-full h-8 w-8 bg-slate-200 flex flex-col justify-center">
                        <div className="flex justify-center">{firstname[0] + lastname[0]}</div>
                    </div>
                    <div className="font-semibold">{firstname + " " + lastname}</div>
                </div>
                <InputBox label="Amount (in Rs)" onChange={setamount} type="number"/>
                <Button label="Initiate Transfer" onClick={handleClick}/>
            </div>
        </div>
    </div>
}