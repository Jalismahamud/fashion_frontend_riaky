import AiChatClient from "@/components/dashboard/chat/AiChatClient";

export const metadata = {
  title: 'Chique | Dashboard',
  description: 'Manage your style profile, wardrobe, and personalized recommendations on Chique.',
}

export default async function Dashboard() {
  // main render
  return (
    <AiChatClient />
  );
}