// Reusable validation check component
const ValidationCheck = ({ isValid, label, className = '' }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center 
            ${isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {isValid ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )}
        </div>
        <span className={`text-sm sm:text-base ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            {label}
        </span>
    </div>
);
export default ValidationCheck;