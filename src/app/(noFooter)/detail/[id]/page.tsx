import ProductTop from "@/components/product/productTop";
import ProductFooter from "@/components/product/productFooter";
import Review from "@/components/review/review";
import ProductNav from "@/components/product/productNav";
import ProductContent from "@/components/product/productContent";

export default function Page() {
  return (
    <div>
      <ProductTop />
      {/* info와 review 내비게이션 */}
      <ProductNav info={true} />
      {/* 좋아요 버튼과 예약하기 버튼있는 footer */}
      <ProductFooter />
      <ProductContent />
      {/* info와 review 내비게이션 */}
      <ProductNav info={false} />
      <Review />
    </div>
  );
}
