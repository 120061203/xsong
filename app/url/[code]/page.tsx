import { redirect } from 'next/navigation';

interface UrlRedirectPageProps {
  params: Promise<{
    code: string;
  }>;
}

// 生成靜態參數以支援靜態導出
export function generateStaticParams() {
  // 返回一些常見的短網址代碼，或者返回空數組讓 Next.js 動態生成
  return [];
}

export default async function UrlRedirectPage({ params }: UrlRedirectPageProps) {
  const { code } = await params;

  // 在伺服器端重定向
  redirect(`https://go-shorturl.vercel.app/url/${code}`);
}
