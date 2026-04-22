"use client";
import CommonBtn from "@/components/common/CommonBtn";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import axiosPublic from "@/lib/axios.public";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terms: true,
    },
  });
  // axios hook
  const axiosInstance = axiosPublic();
  // mutate
  const contactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/contact-us", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message || "Contact submitted successfully");
      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  })
  // on submit
  const onSubmit = (data) => {
    contactMutation.mutate(data);
  };
  // main render
  return (
    <div className="bg-[#FAFAFB] max-w-[646px] w-full flex flex-col xl:gap-8 lg:gap-7 md:gap-5 gap-4 rounded-3xl border border-[#DFE0E4] xl:p-8 lg:p-7 md:p-6 p-4 items-start justify-start">
      <p className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-extrabold text-primary-dark font-secondary">Contact now</p>
      {/* contact now form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        {/* full name */}
        <CommonInputWrapper
          register={register}
          errors={errors}
          type="text"
          name="full_name"
          control={control}
          placeholder="Your name"
          register_as="full_name"
          label="Full Name:"
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
          control={control}
          placeholder="abc@gmail.com"
          register_as="email"
          label="Email Address:"
          validationRules={{
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          }}
        />
        {/* phone number */}
        <CommonInputWrapper
          register={register}
          errors={errors}
          type="number"
          name="phone"
          control={control}
          placeholder="ex 012345678"
          register_as="phone"
          label="Phone Numbers:"
          validationRules={{
            required: "This field is required",
          }}
        />
        {/* subject */}
        <CommonInputWrapper
          register={register}
          errors={errors}
          type="text"
          name="subject"
          control={control}
          placeholder="Enter Keyword"
          register_as="subject"
          label="Subject:"
          validationRules={{
            required: "This field is required",
          }}
        />
        {/* your message */}
        <CommonInputWrapper
          register={register}
          errors={errors}
          type="textarea"
          name="message"
          control={control}
          placeholder="Message"
          register_as="message"
          label="Your Message:"
          validationRules={{
            required: "This field is required",
          }}
        />

        {/* terms and conditions */}
        <label htmlFor="terms" className="w-full flex gap-2 cursor-pointer justify-start items-start xl:py-5 lg:py-4 md:py-3 py-2">
          <input
            type="checkbox"
            id="terms"
            defaultChecked
            className={`w-4 h-4 ${errors.terms ? 'accent-red-500' : 'accent-primary-dark'}`}
            {...register("terms", {
              required: "You must accept the terms to continue"
            })}
          />
          <span className={`text-sm -mt-1 capitalize text-[#0B0B0B] max-w-[458px] ${errors.terms ? 'text-red-500' : ''}`}>
            I agree that my data may be processed to respond to my request for information.
          </span>
        </label>
        {/* error terms */}
        {errors.terms && (
          <ErrorText error={errors?.terms?.message} />
        )}
        {/* send message button */}
        <CommonBtn
          type="submit"
          disabled={contactMutation.isPending}
          isLoading={contactMutation.isPending} >
          Send Message
        </CommonBtn>
      </form>
    </div>
  );
};
export default ContactForm;