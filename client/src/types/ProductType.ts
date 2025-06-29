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
    photo: [{
      id: number,
      url: string,
    }];
    featured: boolean;
    views: Number;
    soldNumber: Number;
    createdAt: Date | null,
    userWishlist: string[],
};

export type ProductContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  productLoading?: boolean;
  setProductLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: ProductType,
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType>>,
  updateproductwishlist: (pid: string, uid: string)=> void,
  setApiChange: React.Dispatch<React.SetStateAction<boolean>>
};
