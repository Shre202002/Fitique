# Fitique - Custom Tailored Fashion Frontend

This is the frontend for Fitique, a modern e-commerce platform for custom-tailored fashion. It is built with Next.js, providing a fast, responsive, and feature-rich user experience for both customers and tailors.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15 with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API (for Cart Management)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

First, clone the project repository to your local machine:
```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install the necessary npm packages defined in `package.json`:
```bash
npm install
```

### 3. Environment Variables

This project may require environment variables for certain integrations (e.g., Firebase, Genkit). Create a `.env.local` file in the root of the project and add any necessary variables.

Example `.env.local`:
```
# For Google AI / Genkit
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running the Development Server

To start the Next.js development server, run the following command:
```bash
npm run dev
```
This will start the application in development mode with hot-reloading. Open [http://localhost:9002](http://localhost:9002) to view it in your browser.

## Available Scripts

This project includes the following scripts in `package.json`:

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Creates a production-ready build of the application.
- `npm run start`: Starts the application in production mode (requires a build to be created first).
- `npm run lint`: Lints the codebase for potential errors and style issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run genkit:dev`: Starts the Genkit development server for AI flow development.
- `npm run genkit:watch`: Starts the Genkit development server in watch mode.

## Project Structure

The project follows the standard Next.js App Router structure. Here's an overview of the key directories:

- **`src/app/`**: Contains all the routes for the application. Each folder represents a URL segment.
  - `(pages)/`: Sub-folders for each page (e.g., `/products`, `/cart`, `/checkout`).
  - `layout.tsx`: The root layout for the entire application.
  - `globals.css`: Global styles and Tailwind CSS configuration.
- **`src/components/`**: Contains reusable React components.
  - `ui/`: Auto-generated components from ShadCN UI.
  - `layout/`: Components for the main layout, such as the `Header` and `Footer`.
  - `product-card.tsx`: Component for displaying a single product.
- **`src/context/`**: Contains React Context providers for global state management.
  - `cart-context.tsx`: Manages the state of the shopping cart.
- **`src/lib/`**: Utility functions and data sources.
  - `data.ts`: Mock data for products.
  - `utils.ts`: General utility functions, like `cn` for Tailwind class merging.
- **`src/ai/`**: Contains Genkit flows and AI-related logic.
- **`public/`**: Static assets that are publicly accessible, such as images and fonts.

## Backend Integration Points

To make this frontend fully functional, the backend team will need to implement API endpoints to handle various actions. These are clearly marked in the code with comments like `BACKEND INTEGRATION POINT`.

Key areas for backend integration include:
- **Authentication**: `src/app/login/page.tsx` (User login)
- **User Account**: `src/app/account/page.tsx` (Profile, Orders, Addresses)
- **Tailor Registration**: `src/app/tailor/register/page.tsx`
- **Product Interaction**: `src/app/products/[id]/product-detail-client.tsx` (Wishlist, Custom Measurements)
- **Order Processing**: `src/app/checkout/page.tsx`
- **Newsletter**: `src/components/layout/footer.tsx`
