import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserImg =() => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src="https://ui-avatars.com/api/?name=Random+User&background=random"
        alt="@shadcn"
      />
      <AvatarFallback>RU</AvatarFallback>
    </Avatar>
  );
}
export default UserImg;
