import { notFound } from 'next/navigation';
import type { Product } from '@/types';
import { getAllProducts, getProductById } from '@/lib/data';
import { ProductDetailClient } from './product-detail-client';


export function generateStaticParams() {
  const products = getAllProducts();
 
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // We render the client component here and pass the product data to it.
  return <ProductDetailClient product={product} />;
}
