export function Button({label , onClick}){
    return <button onClick={onClick} type="button" className="text-3xl mt-5 mb-3 p-4 w-full rounded-[50px] text-white bg-sky-500 hover:bg-emerald-400">{label}</button>
}