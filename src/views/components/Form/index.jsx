import { FormStyle, FormTitleStyle, InputStyle, LabelStyle, InputContainerStyle } from "../../../utils/style/FormStyle";
import { Button } from "../../../utils/style/GlobalStyle";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

export default function Form({ form, setForm, initialForm, title, formArr, submitBtn, onSubmit }) {
    //make an object with each key being the name of the input with an empty string as its value
    // const prepareForm = (formArr) => {
    //     return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
    // };
    // const initialForm = prepareForm(formArr)
    // const [form, setForm] = useState(initialForm);

    //take previous state as argument so we can destructure it to change the correct key of the form with the actual input's value
    const onChangeHandler = (e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value}));
    
    const onSubmitHandler = () => onSubmit();

    return (
        <FormStyle >
            <FormTitleStyle>{title}</FormTitleStyle>
            {formArr.map(({label, name, type, placeholder}, index) => (
                <InputContainerStyle key={index}>
                    <LabelStyle>{label}</LabelStyle>
                    <InputStyle 
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        value={form[name]} 
                        onChange={(e)=>onChangeHandler(e)} 
                    />
                </InputContainerStyle>
            ))}
            <Button type="submit" onClick={(e) => {
                e.preventDefault();
                onSubmitHandler();
            }}>{submitBtn}</Button>
        </FormStyle>
    )
}

Form.defaultProps = {
    title: "Signup",
    formArr: [
        {
            label: "Email",
            name: "email",
            type: "email", 
            placeholder: "Type your email"
        },
        {
            label: "Password",
            name: "password",
            type: "password", 
            placeholder: "Type your password"
        },
    ],
    submitBtn: "Create account",
    onSubmit: (form) => console.log(form)
};

Form.propTypes = {
    title: PropTypes.string.isRequired,
    formArr: PropTypes.arrayOf(
        PropTypes.shape(
            {
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired, 
                placeholder: PropTypes.string.isRequired
            },
            {
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired, 
                placeholder: PropTypes.string.isRequired
            }
        ).isRequired
    ).isRequired,
    submitBtn: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};