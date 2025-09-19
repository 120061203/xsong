import { redirect } from 'next/navigation';

export default function CVPage() {
  // 重定向到下載最新的 resume
  redirect('/songlinchen_20250505.pdf');
}
