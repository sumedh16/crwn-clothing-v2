import ProductCard from "../../components/product-card/product-card.component";
import SHOP_DATA from "../../utils/shop-data.json";
import { useEffect } from "react";
import "./shop.styles.scss";
const Shop = () => {

    useEffect(
        () => {
           SHOP_DATA.forEach((item) => {
                console.log(item);
            }); 
        }, []
    );
    return (
        <div>
            <h1>Inside Shop Item</h1>
            <div className="shop-grid">
                {SHOP_DATA.map((item) => {
                return <ProductCard key={item.id} product={item} />
            })}
            </div>
            
        </div>     
    )
};
export default Shop;