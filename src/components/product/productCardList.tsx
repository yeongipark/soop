import ProductCard from "./productCard";
import style from "./productCardList.module.css";

export default function ProductCardList() {
  return (
    <div>
      <div className={style.container}>
        <ProductCard />
        <ProductCard />
      </div>
      <div className={style.container}>
        <ProductCard />
        <ProductCard />
      </div>
      <div className={style.container}>
        <ProductCard />
        <ProductCard />
      </div>
      <div className={style.container}>
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
