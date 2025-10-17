import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectMeta, PROJECTS } from '../projects.data';

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const meta = getProjectMeta(params.id);
  const siteUrl = 'https://xsong.us';
  const pageUrl = `${siteUrl}/projects/${params.id}`;
  const ogImage = `${siteUrl}/images/projects/png/${params.id}.png`;
  const title = meta ? `${meta.title} - xsong.us` : 'Project - xsong.us';
  const description = meta?.description || 'Project details on xsong.us';

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta?.title || 'Project' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const meta = getProjectMeta(params.id);
  if (!meta) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">返回 Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">← 返回 Projects</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">{meta.title}</h1>
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6" style={{ aspectRatio: '16/9' }}>
          <Image src={`/images/projects/png/${meta.id}.png`} alt={`${meta.title} og image`} fill className="object-cover" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg">{meta.description}</p>
      </div>
    </main>
  );
}


