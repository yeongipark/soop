import ClientLoginPage from "./clientLoginPage";

export async function generateStaticParams() {
  const providers = ["kakao", "google"];
  return providers.map((provider) => ({ provider }));
}

export default function LoginPage({
  params,
}: {
  params: { provider: string };
}) {
  return <ClientLoginPage provider={params.provider} />;
}
