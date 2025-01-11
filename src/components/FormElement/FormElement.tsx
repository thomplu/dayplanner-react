import { FormInput, FormInputType } from '../../types/Form'
import Checkbox from '../CheckBox/Checkbox'
import "./FormElement.scss"
import RadioBtn from '../RadioBtn/RadioBtn';
import { useRef } from 'react';

type FormElementProps = {
    id: string
    label: string
    type: FormInputType
    value: string | boolean | number
    options?: Record<string, string> | undefined
    onChange: (id: string, value: string | boolean | number) => void
}

function FormElement({ id, label, type, value, options, onChange }: FormElementProps) {
    const formEntryRef = useRef<HTMLDivElement | null>(null);
    const formElementWrapperClassName = "form__entry";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { id, checked, name } = e.target;
        let value = e.target.value
        if (type === FormInput.Checkbox) value = checked
        if (type === FormInput.Radio) {
            const query = `input[name='${name}']:checked` as keyof HTMLElementTagNameMap ;
            const checkedInput = e.target.closest<HTMLDivElement>(`.${formElementWrapperClassName}`).querySelector(query) as HTMLInputElement | null
            if (!checkedInput) {
                value = ''
            }
            value = checkedInput?.value ?? '';
        }
        onChange(id, value)
    }

    const renderInput = () => {
        const commonProps = {
            id: id,
            onChange: handleChange
        }
        switch(type) {
            case FormInput.Checkbox:
                return <Checkbox {...commonProps} label={label} checked={ value as boolean }/>
            case FormInput.Text:
                return <input {...commonProps} type="text" value={ value as string }/>
            case FormInput.Textarea:
                return <textarea {...commonProps} value={ value as string }/>
            case FormInput.Radio:
                return <RadioBtn {...commonProps} label={label} options={options ?? {}} checked={ value as boolean }/>
            default:
                return <input {...commonProps} type="text" value={ value as string }/>
        }
    }

    return (
        <div className={formElementWrapperClassName} ref={formEntryRef}>
            {type !== FormInput.Checkbox ?
                <label className="popup__label label" htmlFor={ id }>{ label }</label> : null }
            { renderInput() }
        </div>
    )
}

export default FormElement;