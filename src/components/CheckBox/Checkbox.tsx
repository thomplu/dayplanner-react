import './Checkbox.scss';

type CheckboxProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <label className="cb">
            <input
                id={id}
                className="cb__input"
                type="checkbox"
                checked={checked}
                onChange={handleOnChange}
            />
            <span className="cb__checkmark"></span>
            <span className="cb__label">{label}</span>
        </label>
    );
}

export default Checkbox;
