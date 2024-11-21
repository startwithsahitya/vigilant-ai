'use client'

import { redirect } from "next/navigation";

export default function Home() {
  const authenticated = false;
if(! authenticated){
  redirect('/Home')
}

  return (
    <div>
      <p>{"Humm Achhe Bachhe hai !!"}</p>
    </div>
  );
}
