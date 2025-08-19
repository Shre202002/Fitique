import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden group border-border/80 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${product.id}`} className="block flex-grow">
        <div className="overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="fashion clothing"
          />
        </div>
        <CardContent className="p-4 bg-card">
          <h3 className="text-lg font-bold text-card-foreground truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
