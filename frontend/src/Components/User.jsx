import { useNavigate } from "react-router-dom"

export function User(props){
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        navigate(`/send?id=${props.id}&fn=${props.firstname}&ln=${props.lastname}`);
    }

    return <div className="flex justify-between text-xs py-2">
        <div className="flex gap-2 items-center">
            <div className="rounded-full h-6 w-6 bg-slate-200 flex flex-col justify-center">
                <div className="flex justify-center">{props.firstname[0] + props.lastname[0]}</div>
            </div>
            <div>{props.firstname + " " + props.lastname}</div>
        </div>
        <button className="bg-gray-800 text-white rounded-md px-2 hover:bg-white hover:border hover:text-gray-800" onClick={handleClick}>Send Money</button>
    </div>
}