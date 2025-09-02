import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const originalPrice = product.price * 1.25;

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden group border-border/80 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card">
      <Link href={`/products/${product.id}`} className="block flex-grow flex flex-col">
        <div className="overflow-hidden relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
            data-ai-hint="fashion clothing"
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex gap-2 mb-2">
            <Badge variant="outline">{product.category}</Badge>
            {product.stitchingEnabled && <Badge variant="secondary">Custom Size</Badge>}
          </div>
          <h3 className="text-base font-semibold text-card-foreground ">{product.name}</h3>
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground line-through">₹{originalPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star
                className={`w-4 h-4 text-yellow-400 fill-yellow-400`}
              />
              <span className="text-xs text-muted-foreground ml-1">{product.rating} ({product.reviewCount})</span>
            </div>
          </div>
        </CardContent>
      </Link>
       <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full">Add to Cart</Button>
        <Button variant="outline" size="icon" className="shrink-0">
          <Heart className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
