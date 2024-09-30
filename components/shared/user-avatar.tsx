import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/shared/icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} referrerPolicy="no-referrer" />
      ) : (
        <AvatarFallback>
          <span className="text-3xl font-bold" >{user.name?.slice(0,1)}</span>
          {/* <Icons.user className="size-8" /> */}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
