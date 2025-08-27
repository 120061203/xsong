import RedirectClient from "./RedirectClient";

type ShortUrlPageProps = {
  params: {
    code: string;
  };
};

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  return <RedirectClient code={params.code} />;
}

export async function generateStaticParams() {
  return [];
}
 
