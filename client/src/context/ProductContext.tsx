import { createContext, useContext, useState } from "react";
import type { ProductContextType, ProductType } from "../types/ProductType";







const ProductContext = createContext<ProductContextType | null>(null)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    id: 0,
    productName: "",
    description: "",
    originalPrice: 0,
    price: 0,
    category: "",
    condition: "",
    qty: 0,
    soldNumber: 0,
    image: [],
    seller: "",
    isFeature: false
  })
    const [products, setProducts] = useState<ProductType[]>([
  {
    id: 1,
    productName: "Acer Aspire 7",
    description: "Powerful laptop for gaming and work.",
    originalPrice: 80000,
    price: 70000,
    category: "Laptop",
    condition: "Brand New",
    qty: 12,
    soldNumber: 5,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 2,
    productName: "HP Pavilion",
    description: "Sleek design with high performance.",
    originalPrice: 75000,
    price: 68000,
    category: "Desktop",
    condition: "Like New",
    qty: 5,
    soldNumber: 2,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 3,
    productName: "Asus ROG Strix",
    description: "Built for gamers with powerful graphics.",
    originalPrice: 120000,
    price: 110000,
    category: "Motherboard",
    condition: "Used",
    qty: 3,
    soldNumber: 8,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 4,
    productName: "Dell Inspiron",
    description: "Reliable and durable everyday use laptop.",
    originalPrice: 70000,
    price: 64000,
    category: "Laptop",
    condition: "Brand New",
    qty: 7,
    soldNumber: 6,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 5,
    productName: "Lenovo Legion",
    description: "High-end desktop for creators.",
    originalPrice: 90000,
    price: 87000,
    category: "Desktop",
    condition: "Used",
    qty: 9,
    soldNumber: 3,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 6,
    productName: "MSI B550",
    description: "Motherboard with Ryzen support.",
    originalPrice: 25000,
    price: 23000,
    category: "Motherboard",
    condition: "Like New",
    qty: 4,
    soldNumber: 4,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 7,
    productName: "MacBook Pro M1",
    description: "Fast and efficient Apple silicon chip.",
    originalPrice: 180000,
    price: 165000,
    category: "Laptop",
    condition: "Brand New",
    qty: 6,
    soldNumber: 10,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 8,
    productName: "iMac 24\"",
    description: "All-in-one desktop with Retina display.",
    originalPrice: 160000,
    price: 155000,
    category: "Desktop",
    condition: "Like New",
    qty: 2,
    soldNumber: 7,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 9,
    productName: "ASRock X570",
    description: "ATX motherboard with Wi-Fi 6 support.",
    originalPrice: 30000,
    price: 28000,
    category: "Motherboard",
    condition: "Brand New",
    qty: 8,
    soldNumber: 1,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 10,
    productName: "HP EliteBook",
    description: "Business laptop with premium finish.",
    originalPrice: 85000,
    price: 82000,
    category: "Laptop",
    condition: "Used",
    qty: 10,
    soldNumber: 4,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 11,
    productName: "Dell OptiPlex",
    description: "Compact desktop for office work.",
    originalPrice: 60000,
    price: 58000,
    category: "Desktop",
    condition: "Brand New",
    qty: 11,
    soldNumber: 6,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 12,
    productName: "Gigabyte Z690",
    description: "High-performance motherboard for Intel.",
    originalPrice: 35000,
    price: 32000,
    category: "Motherboard",
    condition: "Like New",
    qty: 6,
    soldNumber: 8,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 13,
    productName: "Acer Swift X",
    description: "Lightweight and powerful for travel.",
    originalPrice: 95000,
    price: 91000,
    category: "Laptop",
    condition: "Brand New",
    qty: 3,
    soldNumber: 2,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 14,
    productName: "Corsair One i300",
    description: "Mini PC with extreme specs.",
    originalPrice: 250000,
    price: 245000,
    category: "Desktop",
    condition: "Used",
    qty: 1,
    soldNumber: 9,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 15,
    productName: "ASUS Prime Z390",
    description: "Perfect for Intel 9th gen CPUs.",
    originalPrice: 18000,
    price: 16500,
    category: "Motherboard",
    condition: "Brand New",
    qty: 15,
    soldNumber: 1,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 16,
    productName: "Microsoft Surface",
    description: "Hybrid tablet laptop for flexibility.",
    originalPrice: 120000,
    price: 115000,
    category: "Laptop",
    condition: "Like New",
    qty: 5,
    soldNumber: 5,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 17,
    productName: "Lenovo ThinkCentre",
    description: "Reliable desktop with small form factor.",
    originalPrice: 50000,
    price: 47000,
    category: "Desktop",
    condition: "Used",
    qty: 7,
    soldNumber: 3,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 18,
    productName: "MSI MAG B660",
    description: "DDR4 support and Intel ready.",
    originalPrice: 20000,
    price: 19500,
    category: "Motherboard",
    condition: "Brand New",
    qty: 9,
    soldNumber: 7,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  },
  {
    id: 19,
    productName: "HP Spectre x360",
    description: "Convertible laptop with touchscreen.",
    originalPrice: 130000,
    price: 125000,
    category: "Laptop",
    condition: "Like New",
    qty: 6,
    soldNumber: 10,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: true
  },
  {
    id: 20,
    productName: "Alienware Aurora",
    description: "Ultimate gaming desktop setup.",
    originalPrice: 220000,
    price: 210000,
    category: "Desktop",
    condition: "Used",
    qty: 2,
    soldNumber: 6,
    image: ["/carousel/gpu.png", "Laptop.jpg", "Monitor.png", "Motherboard.png"],
    seller: "Binod",
    isFeature: false
  }
])

    const [loading, setLoading] = useState(true)


    return (
        <ProductContext.Provider value={{products, setProducts, loading, setLoading, selectedProduct, setSelectedProduct}}>
            {children}
        </ProductContext.Provider>
    )
}



export const useProductContext = () => {
    const context = useContext(ProductContext)
    if(!context) {
        throw new Error("useProductContext must be used within Product Provider")
    }
    return context
}


