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

export type CheckoutFormType = {
  fullname: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  payment: string;
};

export type SideCartProps = {
  showCart: boolean;
};

export type HomeProps = {
  updateCartCount: () => void;
  cartCount: number;
};

export type ReviewType = {
  email: string;
  rating: number;
  review: string;
};
