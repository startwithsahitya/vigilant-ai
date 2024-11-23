'use client'

import { redirect } from "next/navigation";

export default function Home() {
  const authenticated = false;
if(! authenticated){
  redirect('/Login')
}

  return (
    <div>
      <p>{"Humm Achhe Bachhe hai !!"}</p>
    </div>
  );
}
