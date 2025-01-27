export function SendButton ({onClick}){
    return (
        <div>
            <button onClick={onClick} type="button" className="border px-2 w-[140px] h-[50px] rounded-[50px] bg-emerald-300 font-mono text-lg hover:bg-emerald-400 hover:w-[150px] hover:h-[60px] hover:rounded-[100px] transition-all">Send Money</button>
        </div>
    )
}