export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  origin: string;
  notes: string;
}

export const products: Product[] = [
  {
    id: "cafe-do-serrado",
    name: "Café do Serrado",
    description:
      "Um café encorpado com notas de chocolate e nozes, cultivado nas planícies férteis do cerrado mineiro. Torra média que realça a doçura natural do grão.",
    price: 49.9,
    origin: "Cerrado Mineiro",
    notes: "Chocolate, Nozes, Caramelo",
  },
  {
    id: "cafe-da-montanha",
    name: "Café da Montanha",
    description:
      "Cultivado em altitudes elevadas, este café apresenta acidez brilhante e notas frutadas. A altitude proporciona um desenvolvimento lento do grão, resultando em sabor complexo.",
    price: 54.9,
    origin: "Montanhas de Minas",
    notes: "Frutas vermelhas, Floral, Cítrico",
  },
];


export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
