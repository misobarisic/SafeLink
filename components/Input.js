export default function Input({placeholder, value, onChangeHandler}) {
    return (
        <input
            type="text"
            className="shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 block text-md md:text-xl w-full max-w-2xl border-gray-300 rounded-md"
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
        />
    )
}
