export type ProductType = {
  id: string;
    poster: string;
    role: string;
    productName: string;
    description: string;
    price: number;
    originalPrice: number;
    category: string;
    condition: string;
    qty: number;
    photo: string[];
    featured: boolean;
    views: Number;
    soldNumber: Number
};

export type ProductContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  productLoading?: boolean;
  setProductLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: ProductType,
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType>> 
};
