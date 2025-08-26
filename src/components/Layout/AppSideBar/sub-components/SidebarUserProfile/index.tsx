import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserSession } from "@/lib/session";
import stringAvatar from "@/utils/stringAvatar";

export default async function SidebarUserProfile() {
  const user = await getUserSession();
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.image as string} />
        <AvatarFallback>{stringAvatar(user?.name as string)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-muted-foreground text-sm">
          {user.name}
        </p>
        <p className="text-muted-foreground text-xs">{user.email}</p>
      </div>
    </div>
  );
}
