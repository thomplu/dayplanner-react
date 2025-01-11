export enum FormInput {
    Text = 'text',
    Textarea = 'textarea',
    Checkbox = 'checkbox',
    Radio = 'radio'
}

export type FormInputType = FormInput.Text | FormInput.Textarea | FormInput.Checkbox | FormInput.Radio