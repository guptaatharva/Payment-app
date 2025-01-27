import { useNavigate } from 'react-router-dom';

export function Appbar() {
    const navigate = useNavigate();
    function onClick() {
        localStorage.removeItem('token');
        navigate('/signin');
    }

    return (
        <div className="flex items-center justify-between bg-blue-500 text-white p-4 shadow-lg">
            <p className="text-xl font-bold ml-5">PayTm</p>
            <button 
                className="bg-white text-blue-500 font-semibold border mr-8 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-200 transition-all" 
                onClick={onClick}
            >
                Log Out
            </button>
        </div>
    );
}
