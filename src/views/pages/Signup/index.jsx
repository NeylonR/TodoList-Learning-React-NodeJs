import Form from "../../components/Form";
import { useState, useEffect } from "react";
export default function Signup() {
    const prepareForm = (formArr) => {
        return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
    };
    
    const formArr = [
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
    ];
    const initialForm = prepareForm(formArr);
    const [form, setForm] = useState(initialForm);
    function useFetch(url) {
        const [data, setData] = useState({});
        const [error, setError] = useState(false);

            if(!url) return;
            async function fetchData() {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: `{
                            email: ${form.email},
                            password: ${form.password}
                        }`
                    });
                    const data = await response.json();
                    setData(data);
                } catch (error) {
                    console.log(error);
                    setError(true);
                } finally {
                }
            }
            fetchData();
    
        return { data, error }
    }
    
    return (
        <section>
            <Form 
            form={form}
            setForm={setForm}
            initialForm={initialForm}
            action="POST" 
            target="localhost:4200/signup"
            title="Signup"
            submitBtn="Create account"
            onSubmit={useFetch('localhost:4200/signup')}
            formArr= {formArr}
            />
        </section>
    )
}