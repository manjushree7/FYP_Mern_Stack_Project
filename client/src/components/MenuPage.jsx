// import React, { useState, useEffect } from 'react';
// import { ShoppingCart, Plus, Minus, Star, Clock, Flame } from 'lucide-react';

// const MenuPage = () => {
//   const [cart, setCart] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Sample menu data - replace with your API call
//   const menuItems = [
//     {
//       id: 1,
//       name: "Margherita Pizza",
//       description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
//       price: 12.99,
//       image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
//       category: "pizza",
//       rating: 4.5,
//       prepTime: "15-20 min",
//       isSpicy: false
//     },
//     {
//       id: 2,
//       name: "Chicken Tikka Masala",
//       description: "Tender chicken in creamy tomato-based curry sauce",
//       price: 16.99,
//       image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
//       category: "curry",
//       rating: 4.7,
//       prepTime: "20-25 min",
//       isSpicy: true
//     },
//     {
//       id: 3,
//       name: "Caesar Salad",
//       description: "Crisp romaine lettuce with parmesan cheese and croutons",
//       price: 9.99,
//       image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop",
//       category: "salad",
//       rating: 4.3,
//       prepTime: "10-15 min",
//       isSpicy: false
//     },
//     {
//       id: 4,
//       name: "Beef Burger Deluxe",
//       description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
//       price: 14.99,
//       image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
//       category: "burger",
//       rating: 4.6,
//       prepTime: "15-20 min",
//       isSpicy: false
//     },
//     {
//       id: 5,
//       name: "Pad Thai",
//       description: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
//       price: 13.99,
//       image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop",
//       category: "asian",
//       rating: 4.4,
//       prepTime: "18-22 min",
//       isSpicy: true
//     },
//     {
//       id: 6,
//       name: "Chocolate Lava Cake",
//       description: "Warm chocolate cake with molten center, served with vanilla ice cream",
//       price: 7.99,
//       image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
//       category: "dessert",
//       rating: 4.8,
//       prepTime: "12-15 min",
//       isSpicy: false
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Items' },
//     { id: 'pizza', name: 'Pizza' },
//     { id: 'burger', name: 'Burgers' },
//     { id: 'salad', name: 'Salads' },
//     { id: 'curry', name: 'Curry' },
//     { id: 'asian', name: 'Asian' },
//     { id: 'dessert', name: 'Desserts' }
//   ];

//   const filteredItems = selectedCategory === 'all'
//     ? menuItems
//     : menuItems.filter(item => item.category === selectedCategory);

//   const addToCart = (item) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map(cartItem =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (itemId) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevCart.map(cartItem =>
//           cartItem.id === itemId
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//         );
//       }
//       return prevCart.filter(cartItem => cartItem.id !== itemId);
//     });
//   };

//   const getCartItemQuantity = (itemId) => {
//     const item = cart.find(cartItem => cartItem.id === itemId);
//     return item ? item.quantity : 0;
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const handleOrder = () => {
//     if (cart.length === 0) {
//       alert('Your cart is empty!');
//       return;
//     }

//     // Here you would typically make an API call to your backend
//     console.log('Order placed:', cart);
//     alert(`Order placed successfully! Total: $${getTotalPrice().toFixed(2)}`);
//     setCart([]);
//     setIsCartOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
//             <p className="text-gray-600">Delicious food, delivered fresh</p>
//           </div>
//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="relative bg-orange-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-orange-600 transition-colors shadow-lg"
//           >
//             <ShoppingCart size={20} />
//             <span className="font-medium">Cart</span>
//             {getTotalItems() > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                 {getTotalItems()}
//               </span>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Category Filter */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex flex-wrap gap-2 mb-8">
//           {categories.map(category => (
//             <button
//               key={category.id}
//               onClick={() => setSelectedCategory(category.id)}
//               className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category.id
//                   ? 'bg-orange-500 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                 }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Menu Items Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredItems.map(item => (
//             <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 {item.isSpicy && (
//                   <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
//                     <Flame size={12} />
//                     <span className="text-xs font-medium">Spicy</span>
//                   </div>
//                 )}
//                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
//                   <Star size={12} className="text-yellow-400 fill-current" />
//                   <span className="text-xs font-medium">{item.rating}</span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
//                   <span className="text-xl font-bold text-orange-500">${item.price}</span>
//                 </div>

//                 <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>

//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-1 text-gray-500">
//                     <Clock size={14} />
//                     <span className="text-sm">{item.prepTime}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   {getCartItemQuantity(item.id) > 0 ? (
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="text-lg font-bold min-w-[30px] text-center">
//                         {getCartItemQuantity(item.id)}
//                       </span>
//                       <button
//                         onClick={() => addToCart(item)}
//                         className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => addToCart(item)}
//                       className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
//                     >
//                       <Plus size={18} />
//                       <span>Add to Cart</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Cart Modal */}
//       {isCartOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
//                 <button
//                   onClick={() => setIsCartOpen(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 overflow-y-auto max-h-96">
//               {cart.length === 0 ? (
//                 <div className="text-center py-8">
//                   <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
//                   <p className="text-gray-500">Your cart is empty</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {cart.map(item => (
//                     <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900">{item.name}</h3>
//                         <p className="text-orange-500 font-bold">${item.price}</p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => addToCart(item)}
//                           className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {cart.length > 0 && (
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-lg font-bold">Total:</span>
//                   <span className="text-2xl font-bold text-orange-500">${getTotalPrice().toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={handleOrder}
//                   className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors"
//                 >
//                   Place Order
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;