import './Button.scss'

interface ButtonProps {
    label: string
    onClick?: () => void
}

function Button({label, onClick}: ButtonProps) {
    return <button className="button" onClick={onClick}>{label}</button>
}
export default Button;