import ProductTop from "@/components/product/productTop";
import ProductFooter from "@/components/product/productFooter";
import Review from "@/components/review/review";
import ProductContent from "@/components/product/productContent";
import ProductNav from "@/components/product/productNav";

export default function Page() {
  return (
    <div>
      <ProductTop />
      <div>
        <ProductNav info={true} />
      </div>
      <ProductFooter />
      <ProductContent />
      <div>
        <ProductNav info={false} />
      </div>
      <Review />
    </div>
  );
}
