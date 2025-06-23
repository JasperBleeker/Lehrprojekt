import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const productDir = path.resolve('src/products');
  const files = fs.readdirSync(productDir);

  const products = files.map((file: string) => {
    const filePath = path.join(productDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    return data;
  });

  return { products };
}; 