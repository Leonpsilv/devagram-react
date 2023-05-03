export default function Button({
    type = 'button', text, color = 'primary', disabled = false, onClick
}: {
    type?: any
    text?: string
    color?: string
    disabled?: boolean
    onClick?: any
}) {
    return (
        <button
            type={type}
            className={`btn ${color}`}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
