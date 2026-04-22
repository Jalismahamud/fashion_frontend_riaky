"use client";
import CommonInputWrapper from "../common/CommonInputWrapper"
import { useForm } from "react-hook-form";
import CommonBtn from "../common/CommonBtn";
import { useAuth } from "@/hooks/auth.hook";

const ForgotPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { forgotPassword } = useAuth()
    // on submit
    const onSubmit = (data) => {
        forgotPassword.mutate(data)
    };
    // form render
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
            {/* email */}
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="email"
                name="email"
                placeholder="Enter your email"
                register_as="email"
                label="Email address:"
                validationRules={{
                    required: "Email field is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                    },
                }}
            />
            {/* submit button */}
            <CommonBtn type="submit" className={`mt-4`} isLoading={forgotPassword.isPending} disabled={forgotPassword.isPending}>
                Send code
            </CommonBtn>
        </form>
    )
}

export default ForgotPasswordForm