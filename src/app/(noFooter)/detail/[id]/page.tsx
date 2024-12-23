import ClientProductPage from "./clientProductPage";

export default function ProductPage({ params }: { params: { id: number } }) {
  return <ClientProductPage id={String(params.id)} />;
}
