import { Link } from 'react-router-dom'

export function BottomWarning ({label , buttonText , to}){
    return <div className='font-mono text-[#333333] text-sm justify-center flex items-center gap-2'>
        <div>
            {label}
        </div>
        <div>
            <Link className='text-red-500 underline hover:text-emerald-500' to={to}>
            {buttonText}
            </Link>
        </div>
    </div>
}