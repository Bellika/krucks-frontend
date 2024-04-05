import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInputField from "./form/TextInputField";

interface LoginModalProps {
    onClose: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({ onLoginSuccessful, onClose }: LoginModalProps) => {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await UsersApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Log In</h1>
            <form id="logInForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
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
                form="logInForm"
                disabled={isSubmitting}
            >Log In</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default LoginModal;