import { DM_Sans, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/lib/api/get-user-profile';
import { axiosPrivateServer } from '@/lib/axios.private.server';

// Add this new viewport export
export const viewport = {
    themeColor: 'black',
};

export const metadata = {
    title: "Chique",
    description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
    // Removed themeColor from here
    // Open Graph (Facebook) meta tags
    openGraph: {
        title: "Chique",
        description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
        url: "https://aichique.com", // Your actual URL
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
        title: "Chique",
        description: "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique AI.",
        images: ["/images/meta_images/facebook_meta.png"], // Same or different image for Twitter
        site: "@yourtwitterhandle", // Replace with your Twitter handle
        creator: "@yourtwitterhandle", // Replace with your Twitter handle
    },
    // Additional meta tags
    metadataBase: new URL("https://aichique.com"), // Must match your domain
    alternates: {
        canonical: "/",
    },
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
    },
};

// Primary - DM Sans (all weights)
const primaryFont = DM_Sans({
    subsets: ['latin'],
    variable: '--font-primary',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
});

// Secondary - Playfair Display (all weights/styles)
const secondaryFont = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-secondary',
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
});

// Special - Poppins (all weights)
const specialFont = Poppins({
    subsets: ['latin'],
    variable: '--font-special',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
});

export default async function RootLayout({ children }) {
    // get user data
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.AUTH_TOKEN_NAME)?.value || null;
    const axiosInstance = await axiosPrivateServer();
    let userData = null;
    if (token) {
        try {
            userData = await getUserProfile(axiosInstance);
        } catch (err) {
            console.error("Failed to fetch user on server:", err);
        }
    }
    //  console.log("Server user data:", userData);
    // main render
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${primaryFont.variable} ${secondaryFont.variable} ${specialFont.variable}`}
        >
            <body suppressHydrationWarning>
                <Toaster position="top-center" />
                <AntdRegistry>
                    <Providers serverUserData={userData} serverAccessToken={token}>
                        {children}
                    </Providers>
                </AntdRegistry>
            </body>
        </html>
    );
}