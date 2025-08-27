import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

// 簡單的 Markdown 轉 HTML 函數
function markdownToHtml(markdown: string): string {
  return markdown
    // 標題
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    
    // 粗體和斜體
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // 連結
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // 程式碼
    .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">$1</code>')
    
    // 程式碼區塊
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto"><code class="text-sm">$2</code></pre>')
    
    // 清單
    .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4">$2</li>')
    
    // 段落
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
    
    // 清理多餘的標籤
    .replace(/<p class="mb-4"><\/p>/g, '')
    .replace(/<p class="mb-4">(<h[1-6][^>]*>.*?<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p class="mb-4">(<li[^>]*>.*?<\/li>)<\/p>/g, '<ul class="list-disc mb-4 ml-6">$1</ul>')
    .replace(/<p class="mb-4">(<pre[^>]*>.*?<\/pre>)<\/p>/g, '$1')
    
    // 清理開頭和結尾
    .replace(/^<p class="mb-4">/, '')
    .replace(/<\/p>$/, '');
}

// 使用最簡單的型別定義，避免複雜的型別檢查
export default async function BlogPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = params;
  
  const postPath = path.join(process.cwd(), "content/blog", `${id}.md`);
  
  try {
    const content = await fs.readFile(postPath, "utf-8");
    
    // 解析 frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
      throw new Error("Invalid markdown format");
    }
    
    const [, frontmatter, markdownContent] = frontmatterMatch;
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    const dateMatch = frontmatter.match(/date:\s*(.+)/);
    
    const title = titleMatch ? titleMatch[1].trim() : id;
    const date = dateMatch ? dateMatch[1].trim() : "未知日期";
    
    // 轉換 Markdown 為 HTML
    const htmlContent = markdownToHtml(markdownContent);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 text-lg">{date}</p>
          </header>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/blog"
              className="text-blue-600 dark:text-green-400 hover:underline"
            >
              ← 回到文章列表
            </Link>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    // 使用 error 變數來避免未使用警告
    console.error('Error reading blog post:', error);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">文章未找到</h1>
          <p className="text-gray-600 dark:text-gray-400">
            找不到 ID 為 &quot;{id}&quot; 的文章
          </p>
          <Link 
            href="/blog"
            className="text-blue-600 dark:text-green-400 hover:underline mt-4 inline-block"
          >
            ← 回到文章列表
          </Link>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/blog");
  
  try {
    const files = await fs.readdir(postsDir);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));
    
    return markdownFiles.map((file) => ({
      id: file.replace(/\.md$/, ""),
    }));
  } catch (error) {
    console.error("Error reading blog posts directory:", error);
    return [];
  }
}
