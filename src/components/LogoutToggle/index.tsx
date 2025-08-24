import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";
import auth from "@/config/auth";

export default async function LogoutToggle() {
  const session = await getServerSession(auth);

  if (!session) {
    return null;
  }

  return <LogoutButton />;
}
