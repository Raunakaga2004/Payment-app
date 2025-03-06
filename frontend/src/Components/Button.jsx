export function Button(props){
    return <div className="py-4">
        <button className="bg-gray-800 rounded-md px-2 text-white text-xs w-full py-1 hover:bg-white hover:text-gray-800 hover:border" onClick={props.onClick}>{props.label}</button>
    </div>
}