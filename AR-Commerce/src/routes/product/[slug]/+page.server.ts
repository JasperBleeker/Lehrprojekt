import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const productDir = path.resolve('src/products');
  const files = fs.readdirSync(productDir);
  const file = files.find(f => f.replace(/\.md$/, '').toLowerCase() === slug.toLowerCase());
  if (!file) {
    return { status: 404 };
  }
  const filePath = path.join(productDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: description } = matter(content);
  return { product: { ...data } };
}; 