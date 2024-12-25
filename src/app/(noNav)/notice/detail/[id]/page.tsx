"use client";

import ClientNoticePage from "./clientNoticePage";

export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  return <ClientNoticePage id={String(id)} />;
}
