import RedirectClient from "./RedirectClient";

export default async function ShortUrlPage({
  params,
}: {
  params: { code: string };
}) {
  return <RedirectClient code={params.code} />;
}

export async function generateStaticParams() {
  return [];
}
 
