"use client";
import { useForm } from "react-hook-form";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { validatePassword } from "@/utils/validatePassword";
import CommonBtn from "../common/CommonBtn";
import { useAuth } from "@/hooks/auth.hook";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // on submit
  const { register: sign_up } = useAuth();
  // on submit
  const onSubmit = async (data) => {
    await sign_up.mutateAsync(data);
  };
  // sign up form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
      {/* name */}
      <CommonInputWrapper
        register={register}
        errors={errors}
        type="text"
        name="name"
        placeholder="Your name"
        register_as="name"
        label="Your Name:"
        validationRules={{
          required: "This field is required",
        }}
      />
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
          required: "This field is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter a valid email address",
          },
        }}
      />
      {/* password */}
      <CommonInputWrapper
        register={register}
        errors={errors}
        type="password"
        name="password"
        placeholder="Enter password"
        register_as="password"
        label="Password:"
        validationRules={{
          required: "This field is required",
          validate: validatePassword,
        }}
      />
      {/* confirm password */}
      <CommonInputWrapper
        register={register}
        errors={errors}
        type="password"
        name="password_confirmation"
        placeholder="Confirm password"
        register_as="password_confirmation"
        label="Confirm Password:"
        validationRules={{
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
      />
      {/* submit button */}
      <CommonBtn type="submit" className={` mt-4`} isLoading={sign_up.isPending} disabled={sign_up.isPending} >
        Sign Up
      </CommonBtn>
    </form>
  );
};
export default SignUpForm;