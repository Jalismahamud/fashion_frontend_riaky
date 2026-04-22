import About from "@/components/home/About";
import ChiqueAI from "@/components/home/ChiqueAI";
import Evolution from "@/components/home/Evolution";
import Hero from "@/components/home/Hero";
import Price from "@/components/home/Price";
import Testimonial from "@/components/home/Testimonial";
import WhyCreated from "@/components/home/WhyCreated";
import { getTestimonials } from "@/lib/api/get-testimonials";
import axiosPublic from "@/lib/axios.public";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const metadata = {
  title: "Chique | Home",
  description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",

  // Open Graph (Facebook) meta tags
  openGraph: {
    title: "Chique | Home",
    description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
    url: "https://chique-dev.netlify.app/", // Your actual URL
    siteName: "Chique",
    images: [
      {
        url: "/images/meta_images/facebook_meta.png", // Local path (inside `public`)
        width: 1200, // Recommended OG image size
        height: 630,
        alt: "Chique - Your Personal Style Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "Chique | Home",
    description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
    images: ["/images/meta_images/facebook_meta.png"], // Same or different image for Twitter
    site: "@yourtwitterhandle", // Replace with your Twitter handle
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
  },

  // Additional meta tags
  metadataBase: new URL("https://chique-dev.netlify.app"), // Must match your domain
  alternates: {
    canonical: "/",
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const Home = async () => {
  const axiosInstance = axiosPublic();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(axiosInstance),
  });

  // main render
  return (
    <div className="w-full flex flex-col gap-10">
      <Hero />
      <ChiqueAI />
      <WhyCreated />
      <About />
      <Price />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Testimonial />
      </HydrationBoundary>
      <Evolution />
    </div>
  );
};

export default Home;