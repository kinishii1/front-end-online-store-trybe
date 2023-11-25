export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity?: number;
  shipping: {
    free_shipping: boolean;
  };
};
