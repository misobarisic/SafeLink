export default function Input({placeholder, value, onChangeHandler}) {
    return (
        <input
            type="text"
            className="shadow-sm  text-center focus:ring-indigo-500 focus:border-indigo-500 block text-sm w-full border-gray-300 rounded-md"
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
        />
    )
}
