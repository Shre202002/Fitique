import { getAllProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>Products</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-accent font-headline">All Products</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className='text-sm text-muted-foreground'>Sort by:</span>
                <Select defaultValue='featured'>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Average Rating</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}