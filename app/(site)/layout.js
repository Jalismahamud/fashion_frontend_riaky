import MainLayoutClient from "@/components/shared/MainLayoutClient";
export default function MainLayout({ children }) {
  return (
    <MainLayoutClient>
      {children}
    </MainLayoutClient>
  );
}
