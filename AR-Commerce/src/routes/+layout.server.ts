import type { LayoutServerLoad } from './$types';
import { getProductNavList } from '$lib/server/products';

export const load: LayoutServerLoad = async () => {
  const navProducts = getProductNavList();
  return { navProducts };
}; 