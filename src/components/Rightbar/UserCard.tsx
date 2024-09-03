import Image from "next/image";
import { FollowButton } from "./FollowButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface userProps {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  username: string;
  isFollowing?: boolean; // Add this prop
}

const DEFAULT_CAT_AVATAR = "https://avatar.iran.liara.run/public/41";

const TruncatedText: React.FC<{ text: string; maxLength: number }> = ({
  text,
  maxLength,
}) => {
  if (text.length <= maxLength) return <span>{text}</span>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{text.slice(0, maxLength)}...</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const UserCard: React.FC<{ users: userProps }> = ({ users }) => {
  return (
    <div className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg">
      <Link
        href={`/users/${users.username}`}
        className="flex items-center flex-grow min-w-0"
      >
        <Image
          src={users.avatarUrl || DEFAULT_CAT_AVATAR}
          alt={users.displayName || "anonymous"}
          width={32}
          height={32}
          className="rounded-full flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <p className="font-medium text-sm text-gray-800 truncate">
            <TruncatedText
              text={users.displayName || "anonymous"}
              maxLength={15}
            />
          </p>
          <p className="text-xs text-gray-500 truncate">
            <TruncatedText text={`@${users.username}`} maxLength={15} />
          </p>
        </div>
      </Link>

      <FollowButton userId={users.id} isFollowing={users.isFollowing} />
    </div>
  );
};