export type ProductType = {
  id: number;
  productName: string;
  description: string;
  originalPrice: number;
  price: number;
  category: string;
  condition: string;
  qty: number;
  soldNumber: number;
  image: string[];
  seller: string;
  isFeature: boolean;
};

export type ProductContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: ProductType,
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType>> 
};
