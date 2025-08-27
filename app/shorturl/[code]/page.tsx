import RedirectClient from "./RedirectClient";

interface Props {
  params: { code: string };
}

export default async function ShortUrlPage({ params }: Props) {
  return <RedirectClient code={params.code} />;
}

export async function generateStaticParams() {
  return [];
}
 
