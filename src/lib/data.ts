import type { Product } from '@/types';

const products: Product[] = [
  {
    id: 'classic-blue-denim',
    name: 'Classic Blue Denim Jacket',
    description: 'A timeless denim jacket that belongs in every wardrobe. Made from 100% premium cotton for ultimate comfort and durability.',
    price: 89.99,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Men',
    color: 'Blue',
    sizes: ['S', 'M', 'L', 'XL'],
    isFeatured: true,
    stitchingEnabled: true,
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: 'summer-floral-dress',
    name: 'Summer Floral Maxi Dress',
    description: 'Light and airy, this floral maxi dress is perfect for sunny days. Features a flattering waist tie and a beautiful flowing skirt.',
    price: 120.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Women',
    color: 'Multicolor',
    sizes: ['XS', 'S', 'M', 'L'],
    isFeatured: true,
    stitchingEnabled: true,
    rating: 4.8,
    reviewCount: 250,
  },
  {
    id: 'linen-blend-shirt',
    name: 'Linen-Blend Shirt',
    description: 'Stay cool and stylish with our breathable linen-blend shirt. A versatile piece for casual outings or smart-casual events.',
    price: 65.50,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Men',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: false,
    stitchingEnabled: false,
    rating: 4.2,
    reviewCount: 88,
  },
  {
    id: 'cashmere-scarf',
    name: 'Pure Cashmere Scarf',
    description: 'Wrap yourself in luxury with our 100% pure cashmere scarf. Incredibly soft and warm, it\'s the perfect winter accessory.',
    price: 150.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Accessories',
    color: 'Gray',
    sizes: ['One Size'],
    isFeatured: true,
    stitchingEnabled: false,
    rating: 4.9,
    reviewCount: 95,
  },
  {
    id: 'kids-dino-hoodie',
    name: 'Dinosaur Graphic Hoodie',
    description: 'A fun and cozy hoodie for your little one, featuring a playful dinosaur graphic. Made with soft fleece to keep them warm.',
    price: 45.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Kids',
    color: 'Green',
    sizes: ['2T', '3T', '4T', '5T'],
    isFeatured: false,
    stitchingEnabled: false,
    rating: 4.7,
    reviewCount: 150,
  },
  {
    id: 'silk-evening-gown',
    name: 'Silk Evening Gown',
    description: 'Elegant and sophisticated, this silk evening gown drapes beautifully for a stunning silhouette. Perfect for formal occasions.',
    price: 350.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Women',
    color: 'Black',
    sizes: ['2', '4', '6', '8', '10'],
    isFeatured: true,
    stitchingEnabled: true,
    rating: 5.0,
    reviewCount: 30,
  },
   {
    id: 'tailored-wool-blazer',
    name: 'Tailored Wool Blazer',
    description: 'A sharp and sophisticated wool blazer, expertly tailored for a modern fit. Features notch lapels and a single-breasted design.',
    price: 250.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Men',
    color: 'Charcoal',
    sizes: ['38R', '40R', '42R', '44L'],
    isFeatured: false,
    stitchingEnabled: true,
    rating: 4.6,
    reviewCount: 75,
  },
  {
    id: 'high-waist-jeans',
    name: 'High-Waist Skinny Jeans',
    description: 'Flatter your figure with these high-waist skinny jeans. Made with stretch denim for a comfortable, curve-hugging fit.',
    price: 78.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'Women',
    color: 'Dark Wash',
    sizes: ['26', '27', '28', '29', '30', '31'],
    isFeatured: false,
    stitchingEnabled: false,
    rating: 4.4,
    reviewCount: 180,
  }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}
