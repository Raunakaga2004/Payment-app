export function AppBar(props){
    return <div className="flex justify-between border-b pb-2 mb-2">
        <div className="font-bold text-xl items-center">Payments App</div>
        <div className="flex gap-2 items-center text-sm">
            <div>{"Hello, " + props.firstname}</div>
            <div className="rounded-full h-8 w-8 bg-slate-200 flex flex-col justify-center">
                <div className="flex justify-center">{props.firstname[0] + props.lastname[0]}</div>
            </div>
        </div>
    </div>
}