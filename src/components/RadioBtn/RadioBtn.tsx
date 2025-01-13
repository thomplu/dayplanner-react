import './RadioBtn.scss';

type RadioBtnProps = {
    id: string;
    label: string;
    options: Record<string, string>;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RadioBtn({ id, options, value, onChange }: RadioBtnProps) {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <div className="radio__group">
            {Object.keys(options).map((key) => (
                <label className="radio" key={key}>
                    <input
                        id={key}
                        className="radio__input"
                        name={id}
                        type="radio"
                        checked={value === key}
                        onChange={handleOnChange}
                    />
                    <span className="radio__checkmark"></span>
                    <span className="radio__label">{options[key]}</span>
                </label>
            ))}
        </div>
    );
}

export default RadioBtn;
