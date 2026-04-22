"use client"

const SuggestionsBar = ({ suggestions, onSuggestionClick }) => {
    return (
        <div className="w-full flex flex-wrap gap-2 justify-end  items-start">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion.id}
                    onClick={() => onSuggestionClick(suggestion.message)}
                    className="3xs:px-4 px-2 py-2 3xs:text-sm text-xs capitalize cursor-pointer text-primary-dark font-medium rounded-full border border-primary-dark hover:bg-primary-dark hover:text-white transition-colors duration-200"
                >
                    {suggestion.message}
                </button>
            ))}
        </div>
    )
}

export default SuggestionsBar