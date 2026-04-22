"use client";
import { useForm } from 'react-hook-form';
import CommonInputWrapper from '../common/CommonInputWrapper';
import { validatePassword } from '@/utils/validatePassword';
import CommonBtn from '../common/CommonBtn';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ValidationCheck from './ValidationCheck';
import { useAuth } from '@/hooks/auth.hook';
import { maskEmail } from '@/utils/maskEmail';

const CreatePasswordForm = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm();
    const [resetToken, setResetToken] = useState(null);
    const [resetEmail, setResetEmail] = useState(null);
    const { resetNewPassword } = useAuth();
    // if no reset token found, redirect to forgot password page
    useEffect(() => {
        const RESET_EMAIL_KEY = process.env.NEXT_PUBLIC_RESET_EMAIL_KEY || "resetEmail";
        const RESET_TOKEN_KEY = process.env.NEXT_PUBLIC_RESET_TOKEN_KEY || "resetToken";
        const resetToken = sessionStorage.getItem(RESET_TOKEN_KEY);
        const resetEmail = sessionStorage.getItem(RESET_EMAIL_KEY);
        if (!resetToken || !resetEmail) {
            router.push("/auth/forgot-password");
            return;
        }
        setResetToken(resetToken);
        setResetEmail(resetEmail);
    }, [router]);
    // password checks state
    const [passwordChecks, setPasswordChecks] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false
    });
    const password = watch("password");
    // password characters checks
    useEffect(() => {
        if (password) {
            setPasswordChecks({
                hasUpperCase: /[A-Z]/.test(password),
                hasLowerCase: /[a-z]/.test(password),
                hasNumber: /[0-9]/.test(password),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                hasMinLength: password.length >= 8
            });
        } else {
            setPasswordChecks({
                hasUpperCase: false,
                hasLowerCase: false,
                hasNumber: false,
                hasSpecialChar: false,
                hasMinLength: false
            });
        }
    }, [password]);
    // form submit
    const onSubmit = (data) => {
        // console.log(data);
        resetNewPassword.mutate({
            ...data,
            token: resetToken,
            email: resetEmail,
        });
    }
    // main ui component
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 sm:gap-6">
            <p className='text-center  font-semibold text-red-400'>
                Resetting your password: {maskEmail(resetEmail) || "--"}
            </p>
            {/* password */}
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="password"
                name="password"
                control={control}
                placeholder="New Password"
                register_as="password"
                validationRules={{
                    required: "This field is required",
                    validate: validatePassword
                }}
            />
            {/* confirm password */}
            <CommonInputWrapper
                register={register}
                errors={errors}
                type="password"
                name="password_confirmation"
                control={control}
                placeholder="Confirm password"
                register_as="password_confirmation"
                validationRules={{
                    validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                }}
            />
            {/* password validation */}
            <div className="flex flex-col gap-3 sm:gap-4">
                <p className="text-base text-gray-700">Password must contain:</p>
                {/* validation checks grid */}
                <div className='grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3'>
                    <ValidationCheck
                        isValid={passwordChecks.hasUpperCase}
                        label="Uppercase letter"
                    />
                    <ValidationCheck
                        isValid={passwordChecks.hasLowerCase}
                        label="Lowercase letter"
                    />
                    <ValidationCheck
                        isValid={passwordChecks.hasNumber}
                        label="Number"
                    />
                    <ValidationCheck
                        isValid={passwordChecks.hasSpecialChar}
                        label="Special character"
                    />
                    <ValidationCheck
                        isValid={passwordChecks.hasMinLength}
                        label="8+ characters"
                        className="xs:col-span-2 sm:col-span-1"
                    />
                </div>
            </div>
            {/* change button */}
            <CommonBtn className={`mt-2 sm:mt-4`} type='submit' disabled={!passwordChecks.hasUpperCase || !passwordChecks.hasLowerCase || !passwordChecks.hasNumber || !passwordChecks.hasSpecialChar || !passwordChecks.hasMinLength || !resetToken || resetNewPassword.isPending} isLoading={resetNewPassword.isPending}>
                Change Password
            </CommonBtn>
        </form>
    );
};
export default CreatePasswordForm;