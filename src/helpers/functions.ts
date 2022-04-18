export const calcSubPrice = (product: any) =>
  +product.count * product.item.price;

export const calcTotalPrice = (products: any) => {
  return products.reduce((ac: any, cur: any) => {
    return (ac += cur.subPrice);
  }, 0);
};

export function getCountProductsInCart() {
  let cart: any = JSON.parse(localStorage.getItem("cart") || "");

  return cart ? cart.products.length : 0;
}
