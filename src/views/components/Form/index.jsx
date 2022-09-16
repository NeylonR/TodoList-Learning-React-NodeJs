import { FormStyle, FormTitleStyle, InputStyle, LabelStyle, InputContainerStyle , ErrorMessageStyle} from "../../../utils/style/FormStyle";
import { Button } from "../../../utils/style/GlobalStyle";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../utils/hooks/useAuth";

export default function Form({ url, title, formArr, submitBtn, errorMessage, formLogin }) {
    //make an object with each key being the name of the input with an empty string as its value
    const prepareForm = (formArr) => {
        return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
    };

    const initialForm = prepareForm(formArr)
    const [form, setForm] = useState(initialForm);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //desctructure previous state and use it to change the correct key of the form with the actual input's value
    const onChangeHandler = (e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value}));

    const validate = (values) => {
        const errors = {};
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.email) {
            errors.email = "Email is required."
        } else if(!regexEmail.test(values.email)){
            errors.email = "Invalid email format.";
        }
        if(!values.password) {
            errors.password = "Password is required.";
        } else if(values.password.length < 4 || values.password.length > 15){
            errors.password = "Password must contains between 4 and 15 characters.";
        }
        return errors;
    }
    
    function handleSubmit(){
        setError(false);
        setFormErrors(validate(form));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            axios.post(url, {...form})
            .then(res => {
                console.log(JSON.stringify(res));
                console.log(res.data.token);
                if(formLogin){ setAuth({...form, token : res.data.token});};
                setForm(initialForm);
                navigate(from, { replace: true});
            })
            .catch(error => {
                console.error(error)
                setError(true);
                setIsSubmit(false);
                // setForm(initialForm);
            });
        } 
        setIsSubmit(false);
    }, [formErrors]);


    return (
        <FormStyle onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(url);
            }}>
            <FormTitleStyle>{title}</FormTitleStyle>
            {formArr.map(({label, name, type, placeholder}, index) => (
                <InputContainerStyle key={label + index}>
                    <LabelStyle htmlFor={name} >{label}</LabelStyle>
                    <InputStyle 
                        id={name}
                        type={type} 
                        name={name} 
                        placeholder={placeholder} 
                        autoComplete="off"
                        value={form[name]} 
                        onChange={(e)=>onChangeHandler(e)} 
                        required={true}
                    />
                    {formErrors[name] && <ErrorMessageStyle>{formErrors[name]}</ErrorMessageStyle>}
                </InputContainerStyle>
            ))}
            {error && <ErrorMessageStyle>{errorMessage}</ErrorMessageStyle>}
            <Button type="submit" disabled={isSubmit}>{submitBtn}</Button>
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
    errorMessage: "Error.",
    formLogin: false
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
    errorMessage: PropTypes.string.isRequired
};