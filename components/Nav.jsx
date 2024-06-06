'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, seToggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setUpProviders();
    }, []);

  return (
    <nav className="flex-between w-full bm-16 pt-3">
        <Link className="flex gap-2 flex-center" href="/">
            <Image 
            src="/assets/images/logo.svg"
            alt="Promptopia"
            width={30}
            height={30}
            className="object-contain"
             />
             <p className="logo_text">Promptopia</p>
        </Link>

        {/* Desktop Navigation */}

        <div className="sm:flex hidden">
            {
            session?.user ? (
            <div className="flex fap-3 md:gap-5">
               <Link href="/create-prompt" className="black_btn">
                Create Prompt
                </Link>

                <button type="button" onClick={signOut} className="outline_btn">
                    Sign Out
                </button>

                <Link href="/profile" className="flex gap-2 flex-center">
                    <Image 
                    src={session?.user.image}
                    alt="Profile"
                    width={37}
                    height={37}
                    className="rounded-full"
                    />
                    <p>{session?.user.name}</p>
                    </Link>
            </div>    
            ) : (
            <>
            {
                providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                        Sign in
                    </button>
                ))
            }
            </>
            )
            }
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                    src={session?.user.image}
                    alt="Profile"
                    width={37}
                    height={37}
                    className="rounded-full"
                    onClick={() => seToggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link 
                            href="/profile" 
                            className="dropdown_link"
                            onClick={() => seToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link 
                            href="/create-prompt" 
                            className="dropdown_link"
                            onClick={() => seToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>

                            <button
                            type="button"
                            onClick={() => {
                                        toggleDropdown(false);
                                        signOut();
                                    }
                            }
                            className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )
            :
            (
            <>
            {
                providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                        Sign in
                    </button>
                ))
            }
            </>
            )
            }
        </div>
    </nav>
  )
}

export default Nav