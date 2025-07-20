import './cart-item.styles.scss';

const CartItem = ({imageUrl,name,price,quantity}) => {
    return <div className='cart-item-container'>
        <img src={imageUrl} alt={name} />
        <div className='item-details'>
            <h2>{name}</h2>
            <span>{quantity} X ${price}</span>
        </div>
    </div>
}

export default CartItem;
