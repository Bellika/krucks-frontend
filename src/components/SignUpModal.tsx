import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInputField from "./form/TextInputField";

interface SignUpModalProps {
    onClose: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onSignUpSuccessful, onClose}: SignUpModalProps) => {

    const { register, handleSubmit, formState: { isSubmitting} } = useForm<SignUpModalProps>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UsersApi.signUp(credentials)
            onSignUpSuccessful(newUser)
        } catch (error) {
            alert(error);
            console.error(error);
        }

    }
    return (
    <div>
        <h1>Sign Up</h1>
        <form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
            name="username" 
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            />
            <TextInputField
            name="email" 
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            />
            <TextInputField
            name="password" 
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            />
        </form>
        <button
            type="submit"
            form="signUpForm"
            disabled={isSubmitting}
        >
            Sign Up
        </button>
        <button onClick={onClose}>Close</button>
    </div>
    );
}

export default SignUpModal;