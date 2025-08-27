import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blog");
  
  try {
    // 檢查資料夾是否存在
    if (!existsSync(postsDir)) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">還沒有任何文章</p>
          <p className="text-sm text-gray-500 mt-2">資料夾路徑：{postsDir}</p>
        </div>
      );
    }
    
    const files = await fs.readdir(postsDir);
    console.log("找到的檔案：", files); // 除錯用
    
    const posts: BlogPost[] = [];
    
    for (const file of files) {
      if (file.endsWith(".md")) {
        const id = file.replace(/\.md$/, "");
        const content = await fs.readFile(path.join(postsDir, file), "utf-8");
        
        // 解析 frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (frontmatterMatch) {
          const [, frontmatter, markdownContent] = frontmatterMatch;
          const titleMatch = frontmatter.match(/title:\s*(.+)/);
          const dateMatch = frontmatter.match(/date:\s*(.+)/);
          
          const title = titleMatch ? titleMatch[1].trim() : id;
          const date = dateMatch ? dateMatch[1].trim() : "未知日期";
          const excerpt = markdownContent.substring(0, 150).replace(/#{1,6}\s*/g, '') + "...";
          
          posts.push({ id, title, date, excerpt });
        } else {
          // 如果沒有 frontmatter，使用檔案名作為標題
          const title = id;
          const date = "未知日期";
          const excerpt = content.substring(0, 150) + "...";
          
          posts.push({ id, title, date, excerpt });
        }
      }
    }
    
    console.log("解析的文章：", posts); // 除錯用
    
    // 按日期排序（最新的在前）
    posts.sort((a, b) => {
      if (a.date === "未知日期" && b.date === "未知日期") return 0;
      if (a.date === "未知日期") return 1;
      if (b.date === "未知日期") return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">還沒有任何文章</p>
            <p className="text-sm text-gray-500">資料夾路徑：{postsDir}</p>
            <p className="text-sm text-gray-500">找到的檔案：{files.join(', ')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">
                  <a 
                    href={`/blog/${post.id}`}
                    className="text-blue-600 dark:text-green-400 hover:underline"
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-red-600 mb-4">讀取文章時發生錯誤</p>
        <p className="text-sm text-gray-500">錯誤詳情：{error instanceof Error ? error.message : String(error)}</p>
        <p className="text-sm text-gray-500 mt-2">資料夾路徑：{postsDir}</p>
      </div>
    );
  }
}