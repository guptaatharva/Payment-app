export const Balance = ({ value }) => {
    return (
        <div className="flex font-mono text-2xl">
            <div className="text-slate-400">
                Your balance: 
            </div>
            <div className="ml-5 mt-0.4">
                Rs {value}
            </div>
        </div>
    );
};
