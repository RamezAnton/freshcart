export const categoryLinks = [
  { label: "All Categories", href: "/categories" },
  { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
  { label: "Women's Fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
  { label: "Men's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
  { label: "Beauty & Health", href: "/products?category=6439d30b67d9aa4ca97064b1" },
];

export const footerGroups = [
  { title: "Shop", links: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    categoryLinks[1], categoryLinks[3], categoryLinks[2],
  ] },
  { title: "Account", links: [
    { label: "My Account", href: "/profile" },
    { label: "Order History", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/register" },
  ] },
  { title: "Support", links: [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
  ] },
  { title: "Legal", links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ] },
];
