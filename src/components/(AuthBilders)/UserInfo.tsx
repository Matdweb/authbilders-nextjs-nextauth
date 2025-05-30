'use client';
import { useState } from "react";
import { Tooltip, User, Chip, Code } from "@heroui/react";
import { usePathname } from "next/navigation";
import { CloseIcon } from "./icons";
import { useSession } from "next-auth/react";
import { User as UserType } from "@/app/lib/(AuthBilders)/defintions";

export function UserInfo() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  if (["/login", "/signUp"].includes(pathname)) return null;

  if (!session) return null;

  const { email, name, image, email_verified } = (session.user as UserType) || {};

  function SessionDisplay() {
    return (
      <div className=" w-full max-w-56 md:max-w-full sm:max-w-80 bg-[#0e0e0e] border border-gray-800 rounded-xl shadow-xl p-4 text-gray-100">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-400">Session data:</span>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-red-400 transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <Code className="w-full max-h-64 overflow-auto">
          <pre className="whitespace-pre-wrap break-words text-xs">{JSON.stringify(session, null, 2)}</pre>
        </Code>
        <span className="mt-2 block text-xs font-medium text-gray-400">Email Verified:</span>
        <Chip
          color={email_verified ? "success" : "danger"}
          variant="dot"
          className="mt-2 border-none h-auto cursor-pointer py-1 bg-white/10 rounded-lg min-w-full"
        >
          {email_verified ? "Email verified" : "Email not verified"}
        </Chip>
      </div >
    )
  }

  return (
    <>
      <Tooltip
        content={SessionDisplay()}
        placement="top"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <User
          avatarProps={{ src: image || "" }}
          description={email || "@who are you?"}
          name={name || "someone"}
          className="absolute bottom-0 right-0 p-4 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
    </>
  );
}
