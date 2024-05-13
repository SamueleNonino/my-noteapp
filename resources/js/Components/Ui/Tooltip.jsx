export default function Tooltip({ message, children }) {
    return (
    <div className="group relative flex">
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">{message}</span>
        {children}
    </div>
    )
}