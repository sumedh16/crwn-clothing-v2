import Button from '../button/button.component';
import './product-card.styles.scss';
import  {useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);
    return (
    <div className='product-card-container' style={{ backgroundImage: `url(${imageUrl})` }}>
        <Button className='add-to-cart-button' buttonType='inverted' onClick ={() => addItemToCart(product)}>
            Add to Cart
        </Button>
        <div className='product-details'>
            <span className='product-name'>{name}</span>
            <span className='product-price'>${price}</span>
        </div>
    </div>);
};

export default ProductCard;