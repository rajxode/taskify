
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import ThemeChange from "./header/ThemeChange";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import AvatarAndMenu from "./header/AvatarAndMenu";

export default async function Header({parent}:{parent:string}) {
  const cookieStore = cookies();
  let user = null;
  const token = (await cookieStore).get("token")?.value;
  if(token) {
    const {data} = await axiosInstance.get("/users/my-data",{
      headers:{
        Cookie: `token=${token}`
      }
    });
    if(data.success) {
      user = data.user;
    }
  }
  return (
    <header
      className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 bg-gradient-to-r 
        from-gray-100/80 to-white/80 
        dark:from-gray-900/90 dark:to-[#121212]/80 
        backdrop-blur-sm transition-shadow duration-300 border-b border-gray-200 
      dark:border-gray-700 shadow-sm"
    >
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold flex items-center text-[#36621f] dark:text-white"
        >
          <Image src={Logo} alt="brand-logo" className="w-6 h-6 mr-2" />
          <h1>Taskify</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          {
            parent === "main"
            ?
              <>
                <Link
                  href="/#features"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Features
                </Link>
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Sign In
                </Link>
              </>
              :
              null
          }
          {
            user
            ?
            <>
              <AvatarAndMenu user={user} />
            </>
            :
            <ThemeChange />
          }
        </nav>
      </div>
    </header>
  );
}
