import { Link } from "react-router-dom";

export function BottomWarning(props){
    return <div className="text-xs flex justify-center">
        <div className="pr-1">
            {props.label}
        </div>
        <Link to={props.to} className="underline">
            {props.buttontext}
        </Link>
    </div>
}