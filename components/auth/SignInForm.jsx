"use client";
import { useForm } from "react-hook-form";
import CommonInputWrapper from "../common/CommonInputWrapper";
import Link from "next/link";
import CommonBtn from "../common/CommonBtn";
import ErrorText from "../common/ErrorText";
import { useAuth } from "@/hooks/auth.hook";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terms: true,
    },
  });
  const { login } = useAuth();
  // on submit
  const onSubmit = async (data) => {
    await login.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
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
      <CommonInputWrapper
        register={register}
        errors={errors}
        type="password"
        name="password"
        placeholder="Enter your password"
        register_as="password"
        label="Password:"
        validationRules={{
          required: "Password field is required",
        }}
      />

      <div className="flex xs:flex-row flex-col justify-end gap-2 xs:gap-0 ">
        <label htmlFor="terms" className="hidden gap-2 cursor-pointer items-center">
          <input
            type="checkbox"
            id="terms"
            defaultChecked
            className={`w-4 h-4 ${errors.terms ? "accent-red-500" : "accent-primary-dark"}`}
            {...register("terms", {
              // required: "You must accept the terms to continue",
            })}
          />
          <span className={`text-base  capitalize ${errors.terms ? "text-red-500" : ""}`}>
            Remember me
          </span>
        </label>
        <Link href="/auth/forgot-password" className="text-[#0D0E10] text-base  underline">
          Forget your password
        </Link>
      </div>

      <CommonBtn type="submit" className="mt-4" isLoading={login.isPending} disabled={login.isPending}>
        Log in
      </CommonBtn>
    </form>
  );
};

export default SignInForm;
