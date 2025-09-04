
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, Minus, Plus, Check, ChevronRight, Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';
import { useCart } from '@/context/cart-context';

function CustomSizeForm({ product }: { product: Product }) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [isCustomSizeOpen, setCustomSizeOpen] = useState(false);

    const handleCustomSizeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({ product, quantity: 1, size: 'Custom', isCustom: true });
        setCustomSizeOpen(false);
        toast({
            title: "Measurements Saved!",
            description: "Your custom sized item has been added to the cart.",
        });
    }

    return (
        <Dialog open={isCustomSizeOpen} onOpenChange={setCustomSizeOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="default" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-base">AI Size Helper</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Custom Measurements</DialogTitle>
                    <DialogDescription>
                        Please provide your measurements for a perfect fit. All measurements are in centimeters.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCustomSizeSubmit} className="grid gap-4 py-4">
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
                    <DialogFooter>
                         <Button type="submit">Save and choose your stitcher</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const similarProducts = getFeaturedProducts().filter(p => p.id !== product.id).slice(0, 4);
  const originalPrice = product.price * 1.25;
  const { addItem } = useCart();


  const handleAddToCart = () => {
    addItem({ product, quantity, size: selectedSize, isCustom: false });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      action: <Check className="h-5 w-5 text-green-500" />,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-6 text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{product.name}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 md:sticky top-24 self-start">
          <div className="aspect-square rounded-lg overflow-hidden border bg-card">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
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
            <h1 className="text-3xl lg:text-4xl font-bold font-headline text-accent">{product.name}</h1>
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
            <p className="text-2xl font-bold text-primary flex items-center gap-2">
                <span>₹{product.price.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">₹{originalPrice.toFixed(2)}</span>
                <span className="text-base font-normal text-green-600">(20% OFF)</span>
            </p>
          </div>
          
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
            <Button size="lg" className="flex-1 text-base" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" variant="ghost" className="flex-1 text-base border border-primary gap-2">
                <Heart className="w-5 h-5"/> Wishlist
            </Button>
          </div>
            {product.stitchingEnabled && (
                <CustomSizeForm product={product} />
            )}
          
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                    <AccordionTrigger>Product Description</AccordionTrigger>
                    <AccordionContent>
                    {product.description}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fabric">
                    <AccordionTrigger>Fabric & Care</AccordionTrigger>
                    <AccordionContent>
                    100% Premium Giza Cotton. Machine wash cold, gentle cycle. Do not bleach. Tumble dry low.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="size">
                    <AccordionTrigger>Size & Fit</AccordionTrigger>
                    <AccordionContent>
                    Model is 6'0" and wearing a size Medium. Regular fit.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {similarProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
