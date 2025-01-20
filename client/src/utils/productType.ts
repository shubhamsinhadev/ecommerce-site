export interface IProduct {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  category: string;
  color?: string;
  discount?: number;
  popular?: boolean;
  onSale?: boolean;
}
