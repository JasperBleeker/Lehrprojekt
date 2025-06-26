import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getProductNavList() {
  const productDir = path.resolve('src/products');
  const files = fs.readdirSync(productDir);
  // Ensure slugs are always lowercased and unique
  const seen = new Set<string>();
  return files.map((file: string) => {
    const filePath = path.join(productDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    // Slug is the filename (without extension), lowercased
    const slug = file.replace(/\.md$/, '').toLowerCase();
    if (seen.has(slug)) return null;
    seen.add(slug);
    return { name: data.name, slug };
  }).filter(Boolean);
} 