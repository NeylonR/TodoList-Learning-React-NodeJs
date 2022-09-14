import Form from "../../components/Form";

export default function Login() {
    return (
        <section>
            <Form 
            action="POST" 
            target="localhost:4200/login"
            title="Login"
            submitBtn="Login"
            // onSubmit={}
            formArr= {[
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
            ]}
            />
        </section>
    )
}