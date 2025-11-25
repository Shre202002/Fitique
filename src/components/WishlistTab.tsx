// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export function WishlistTab() {
//   const [wishlist, setWishlist] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       const res = await fetch("/api/user/wishlist", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setWishlist(data.wishlist || []);
//       setLoading(false);
//     };
//     fetchWishlist();
//   }, []);

//   if (loading) return <p>Loading wishlist...</p>;
//   if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

//   return (
//     <div className="space-y-4">
//       {wishlist.map((item) => (
//         <div
//           key={item.productId}
//           className="flex justify-between items-center border-b py-2"
//         >
//           <Link href={`/products/${item.productId}`}>
//             <span>{item.productName}</span>
//           </Link>
//           <Button
//             variant="destructive"
//             onClick={async () => {
//               const token = localStorage.getItem("token");
//               await fetch("/api/user/wishlist", {
//                 method: "DELETE",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ productId: item.productId }),
//               });
//               setWishlist((prev) =>
//                 prev.filter((w) => w.productId !== item.productId)
//               );
//             }}
//           >
//             Remove
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }
