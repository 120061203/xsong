import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	
	// 按發布日期排序，最新的在前
	const sortedPosts = posts.sort((a, b) => 
		new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
	);
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			// 包含完整的文章內容
			content: post.body,
			// 如果有分類和標籤，也包含進去
			categories: post.data.categories || [],
			tags: post.data.tags || [],
		})),
	});
}
