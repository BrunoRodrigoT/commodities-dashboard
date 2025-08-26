import { getServerSession } from "next-auth";
import Header from "@/components/Layout/Header";
import auth from "@/config/auth";
import Layout from "@/components/Layout";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  const session = await getServerSession(auth);

  if (!session) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return <Layout>{children}</Layout>;
}
