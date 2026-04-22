"use client"
import React from 'react'
import CommonTitle from '../common/CommonTitle'
import Marquee from "react-fast-marquee";
import axiosPublic from '@/lib/axios.public';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/lib/api/get-testimonials';
import TestimonialCard from './TestimonialCard';
import Loader from '../common/Loader';
import { Empty } from 'antd';

const Testimonial = () => {
    // hooks
    const axiosInstance = axiosPublic();

    // get testimonials
    const {
        data: testimonials = [],
        isFetching,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["testimonials"],
        queryFn: () => getTestimonials(axiosInstance),
    });

    // main render
    return (
        <div className='w-full flex flex-col md:gap-6 gap-2 text-center items-center 2xs:py-10 py-2'>
            <CommonTitle
                text="What Our Clients Say About Us"
                className="font-secondary md:text-4xl sm:text-3xl xs:text-2xl text-xl"
            />
            <p className="2xs:text-lg text-base max-w-3xl text-primary-dark font-primary font-normal text-center">
                Community development is often linked with community work or community planning, and may involve stakeholders, foundations.
            </p>

            {/* Loading state */}
            {isLoading || isFetching ? (
                <div className="flex items-center flex-col gap-4 justify-center min-h-96">
                    <Loader />
                    <p className="text-primary-dark text-2xl animate-pulse">Loading testimonials...</p>
                </div>
            ) : isError ? (
                /* Error state */
                <div className="flex items-center justify-center min-h-96 text-red-500">
                    <p>Failed to load testimonials. Please try again later.</p>
                </div>
            ) : testimonials.length === 0 ? (
                /* Empty state */
                <div className="flex items-center flex-col justify-center min-h-96 text-gray-500">
                    <Empty />
                    <p>No testimonials available yet.</p>
                </div>
            ) : (
                /* Success state */
                <Marquee
                    gradient
                    gradientColor="#F9F9F9"
                    gradientWidth={100}
                    autoFill
                    speed={40}
                    pauseOnHover
                    className='w-full 2xs:min-h-96 min-h-64'
                >
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                    ))}
                </Marquee>
            )}
        </div>
    )
}

export default Testimonial
