export function InputBox(props){
    return <div className="text-left text-xs font-semibold py-2">
        <div><label>{props.label}</label></div>
        <div><input className="w-full border rounded-md border-slate-200 px-1 focus:outline-none text-[8px] font-light" onChange={(e)=>props.onChange(e.target.value)} type={props.type}></input></div>
    </div>
}