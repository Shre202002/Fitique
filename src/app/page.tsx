
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from 'react';

const categories = [
    { name: 'Shirts', image: 'https://picsum.photos/300/300?image=1003', href: '/products' },
    { name: 'T-Shirts', image: 'https://picsum.photos/300/300?image=1011', href: '/products' },
    { name: 'Polos', image: 'https://picsum.photos/300/300?image=1041', href: '/products' },
    { name: 'Trousers', image: 'https://picsum.photos/300/300?image=103', href: '/products' },
    { name: 'Shorts', image: 'https://picsum.photos/300/300?image=1061', href: '/products' },
    { name: 'Jeans', image: 'https://picsum.photos/300/300?image=206', href: '/products' },
];

const features = [
    {
        title: "FOR THE MODERN DOCTOR",
        description: "Stay fresh, clean and comfortable throughout your demanding workdays.",
        image: "https://picsum.photos/800/600?image=431",
        href: "/products",
        dataAiHint: "male doctor"
    },
    {
        title: "FOR THE STARTUP CEO",
        description: "Through the wins, the losses, and everything in between, stay sharp and focused.",
        image: "https://picsum.photos/800/600?image=1005",
        href: "/products",
        dataAiHint: "male executive"
    }
]

const heroSlides = [
    {
        image: "https://picsum.photos/1600/900?image=838",
        alt: "Man in a stylish suit",
        title: "ELEVATE YOUR STYLE",
        description: "Discover our premium collection of formal wear, crafted for the modern individual.",
        buttonText: "Shop Collection",
        dataAiHint: "formal wear",
    },
    {
        image: "https://picsum.photos/1600/900?image=1025",
        alt: "Close up of a shirt",
        title: "METICULOUSLY CRAFTED",
        description: "Experience the difference of high-quality fabrics and expert tailoring.",
        buttonText: "Explore Fabrics",
        dataAiHint: "clothing fabric",
    },
    {
        image: "https://picsum.photos/1600/900?image=1005",
        alt: "Man wearing a casual shirt",
        title: "CASUAL ELEGANCE",
        description: "Effortless style for every day. Find your perfect fit with our custom options.",
        buttonText: "View Casual Wear",
        dataAiHint: "casual fashion",
    },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const autoplay = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))

  return (
    <div className="flex flex-col bg-background">
      <section className="relative w-full h-[80vh] md:h-screen text-white -mt-[160px]">
        <Carousel 
            className="w-full h-full embla-fade" 
            plugins={[autoplay.current]}
            opts={{ loop: true }}
        >
            <CarouselContent className="h-full">
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className="h-full relative">
                         <Image 
                            src={slide.image}
                            alt={slide.alt} 
                            fill
                            className="object-cover object-center"
                            data-ai-hint={slide.dataAiHint}
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
                            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl max-w-md">
                                {slide.description}
                            </p>
                            <Button size="lg" variant="secondary" className="mt-6">
                                {slide.buttonText}
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8">
            {categories.map((category) => (
              <Link href={category.href} key={category.name} className="flex flex-col items-center gap-2 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    data-ai-hint="fashion category"
                  />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 my-8">
        <Link href="/products">
            <div className="relative w-full rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/1200/300?image=1025" width={1200} height={300} alt="Ad Banner" className="w-full h-auto" data-ai-hint="clothing banner"/>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     <h2 className="text-3xl font-bold text-white font-headline">BODY-MAPPED SHIRTS</h2>
                </div>
            </div>
        </Link>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter font-headline text-accent">
              Best Sellers
            </h2>
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All
              </Button>
            </Link>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 md:px-6 my-12">
        <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image src={feature.image} width={800} height={600} alt={feature.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform" data-ai-hint={feature.dataAiHint}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-sm font-semibold uppercase tracking-wider">{feature.title}</h3>
                            <p className="text-lg mt-1">{feature.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </section>

       <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter font-headline text-accent">
              New Arrivals
            </h2>
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All
              </Button>
            </Link>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
