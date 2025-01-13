import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import FormElement from './FormElement';
import { FormInput } from '../../types/Form';

export default {
    title: 'Components/FormElement',
    component: FormElement,
    argTypes: {
        id: { control: 'text' },
        value: { control: 'text' },
        type: { control: 'text' },
        label: { control: 'text' },
        onChange: { action: 'changed' },
    },
} as Meta<typeof FormElement>;

// Template for stories
const Template: StoryFn<typeof FormElement> = (args) => {
    const [value, setValue] = useState<string | boolean | number>(
        args.value || ''
    );

    const handleChange = (value: string | boolean) => {
        setValue(value);
    };

    return <FormElement {...args} value={value} onChange={handleChange} />;
};

// Default story
export const Default: StoryObj<typeof FormElement> = {
    render: Template,
    args: {
        id: 'default-input',
        label: 'Default Input',
        value: '',
    },
};

// Prefilled textarea story
export const Prefilled: StoryObj<typeof FormElement> = {
    render: Template,
    args: {
        id: 'prefilled-input',
        label: 'Prefilled Input',
        value: 'Hello World',
    },
};

// Checked Checkbox story
export const CheckedCheckbox: StoryObj<typeof FormElement> = {
    render: Template,
    args: {
        id: 'checked-checkbox',
        label: 'Checked Checkbox',
        type: FormInput.Checkbox,
        value: true,
    },
};

// Checked Checkbox story
export const UnCheckedCheckbox: StoryObj<typeof FormElement> = {
    render: Template,
    args: {
        id: 'unchecked-checkbox',
        label: 'Unchecked Checkbox',
        type: FormInput.Checkbox,
        value: false,
    },
};
