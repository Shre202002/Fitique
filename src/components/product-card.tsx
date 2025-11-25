"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const originalPrice = product.price * 1.25;
  const { addItem } = useCart();
  const { toast } = useToast();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;




  const handleAddToCart = () => {
    addItem({ product, quantity: 1, size: product.sizes[0], isCustom: false });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      action: <Check className="h-5 w-5 text-green-500" />,
    });
  };

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
          />
          <Button
            variant="default"
            size="icon"
            // onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/75 ${
              isInWishlist ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
          </Button>
          {product.stitchingEnabled && (
            <Badge variant="default" className="absolute top-2 left-2">
              Custom
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="text-sm sm:text-base font-semibold text-card-foreground">
            {product.name}
          </h3>
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-lg font-bold text-primary">
                ₹{product.price.toFixed(2)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground line-through">
                ₹{originalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-muted-foreground ml-1">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
