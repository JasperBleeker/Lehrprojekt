import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const productDir = path.resolve('src/products');
  const filePath = path.join(productDir, `${capitalize(slug)}.md`);

  if (!fs.existsSync(filePath)) {
    return { status: 404 };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: description } = matter(content);
  return { product: { ...data, description } };
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 