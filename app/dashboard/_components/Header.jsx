"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
function Header() {
   const path=usePathname();
 
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
        <Image src={"/logo.svg"} width={160} height={100} alt='logo'/>
        <ul className='hidden md:flex gap-6'>
          <Link href={"/dashboard"}>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path==='/dashboard'&& `text-primary font-bold`}`}>Dashboard</li>  </Link>
        <Link href={"/dashboard/questions"}>
         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path==='/dashboard/questions'&& `text-primary font-bold`}`}>Questions</li>
        </Link>
        {/* <Link href={"/dashboard/upgrade"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path==='/dashboard/upgrade'&& `text-primary font-bold`}`}>Upgrade</li>
        </Link>
          */}
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header