export function InputBox({label , placeholder , onChange}) {
    return <div>
        <div className="text-lg font-sans font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="font-mono w-full px-2 py-2 border rounded-xl border-slate-300"></input>
    </div>
}