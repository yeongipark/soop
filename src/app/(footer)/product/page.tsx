import ProductCardList from "@/components/product/productCardList";
import style from "./page.module.css";
import ProductSearch from "@/components/product/productSearch";

export default function Page() {
  return (
    <div>
      <div className={style.text}>
        <p>
          {">"}예약 전 반드시 <a href="/notice">공지</a> 확인 부탁드립니다!{"<"}
        </p>
      </div>
      <ProductSearch />
      <ProductCardList />
    </div>
  );
}
