import ButtonLogout from "@/components/Buttons/ButtonLogOut";
import { ProtectedBadge } from "@/components/(AuthBilders)/ProtectedBadge";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession();

  if (session) {
    return (
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="mb-8 flex justify-center">
            <ProtectedBadge />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-100 sm:text-7xl">AuthBilders.dev</h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">This is a defualt <u className="text-primary-400">protected</u> page. Play around with your new auth system.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/unprotected" className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400">Go to unprotected page</Link>
              <ButtonLogout />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
      </div>
    )

  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-[#12222b] to-[#0e0e0e]">
      <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">You are smart, but</p>
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-100 sm:text-7xl">You are not logged in</h1>
    </div>
  )
}

