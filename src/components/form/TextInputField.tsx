import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string, 
    label: string, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any,
}

const TextInputField = ({name, label, register, registerOptions, ...props} : TextInputFieldProps) => {
    return (
        <div>
            <label>{label}</label>
            <input
            {...props}
            {...register(name, registerOptions)}
            ></input>
        </div>        
    )
}

export default TextInputField;