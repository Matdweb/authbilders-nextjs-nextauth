'use client';
import { useEffect, useRef } from "react";
import { SessionErrorToast } from "@/components/(AuthBilders)/Alerts/Toasts";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SessionErrorToastHandler() {
  const toastShownRef = useRef(false);
  const router = useRouter();
  const { data: session } = useSession()

  useEffect(() => {
    if (session || toastShownRef.current) return;

    toastShownRef.current = true;

    SessionErrorToast({
      endContent: (
        <Button
          size="sm"
          variant="flat"
          color="danger"
          onPress={() => router.push("/login")}
        >
          Login
        </Button>
      ),
    });
  }, [session, router]);

  return null;
}
