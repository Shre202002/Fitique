
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, Minus, Plus, Check, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

function CustomSizeForm({ onSubmit }: { onSubmit: () => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    }
    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-right">Height (cm)</Label>
                <Input id="height" placeholder="e.g. 178" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chest" className="text-right">Chest (cm)</Label>
                <Input id="chest" placeholder="e.g. 102" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="waist" className="text-right">Waist (cm)</Label>
                <Input id="waist" placeholder="e.g. 81" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hips" className="text-right">Hips (cm)</Label>
                <Input id="hips" placeholder="e.g. 106" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="neck" className="text-right">Neck (cm)</Label>
                <Input id="neck" placeholder="e.g. 40" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shoulder" className="text-right">Shoulder (cm)</Label>
                <Input id="shoulder" placeholder="e.g. 48" className="col-span-3" />
            </div>
            <DialogFooter className='sm:justify-between gap-2 flex-col sm:flex-row-reverse'>
                <Button type="submit">Save & Add to Cart</Button>
                 <Button type="button" variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                   AI Size Helper
                </Button>
            </DialogFooter>
        </form>
    );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isCustomSizeOpen, setCustomSizeOpen] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added to cart: ${product.name}, Size: ${selectedSize}, Quantity: ${quantity}`);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      action: <Check className="h-5 w-5 text-green-500" />,
    });
  };

  const handleCustomSizeSubmit = () => {
    // In a real app, you would save the measurements here.
    handleAddToCart();
    setCustomSizeOpen(false);
    toast({
        title: "Measurements Saved!",
        description: "Your custom sized item has been added to the cart.",
    });
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-6 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{product.name}</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 sticky top-24 self-start">
          <div className="aspect-square rounded-lg overflow-hidden border bg-card">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover transition-opacity duration-300"
              data-ai-hint="fashion detail"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)} className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}>
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                  data-ai-hint="product thumbnail"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-accent">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
               <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
                </div>
            </div>
          </div>
          
          <div>
            <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <Separator />
          
          <div className="flex flex-col gap-4">
            <Label className="text-lg font-semibold">Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`border rounded-md px-4 py-2 cursor-pointer transition-colors ${selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

           <div className="flex items-center gap-4">
            <Label className="text-lg font-semibold">Quantity</Label>
            <div className="flex items-center gap-2 border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q+1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" variant="default" className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">Buy Now</Button>
          </div>
            {product.stitchingEnabled && (
                <Dialog open={isCustomSizeOpen} onOpenChange={setCustomSizeOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" variant="default" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Custom Size</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Custom Measurements</DialogTitle>
                            <DialogDescription>
                                Please provide your measurements for a perfect fit. All measurements are in centimeters.
                            </DialogDescription>
                        </DialogHeader>
                        <CustomSizeForm onSubmit={handleCustomSizeSubmit} />
                    </DialogContent>
                </Dialog>
            )}
          
          <Separator className="my-4" />

          <div>
            <h3 className="text-xl font-semibold mb-2">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
