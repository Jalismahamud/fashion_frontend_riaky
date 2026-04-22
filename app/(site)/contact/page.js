import ContactForm from "@/components/auth/ContactForm";

export const metadata = {
  title: "Chique | Contact Us",
  description:
    "Your Personal Style Assistant. Discover your unique style, organize your wardrobe, and get personalized fashion advice with Chique Al.",
};

const Contact = () => {

  // main render
  return (
    <div className="container min-h-screen py-6 sm:py-10 flex justify-center items-center px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;