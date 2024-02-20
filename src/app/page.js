"use client"

import Link from "next/link";
import { category, data } from "./data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CardOne from "./card";

function Home() {
  const router = useRouter()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {router.push("/signin")}
    else{router.push("/")}
  },[])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-20 md:p-40 w-full gap-10'>
      {category.map((c)=><Link href={`/${c.title}`}>
    <CardOne title={c.title} icon={c.icon}/>
    </Link>)}

</div>
  )
}

export default Home