import React from 'react';
import Cart from './cart/Cart';
import ItemSel from './itemSel/ItemSel';
import './CartPart.css'

const CartPart = () => {
    return(
        <div className="cart-part">
            <Cart />
            <ItemSel />
        </div>
    )
}

export default CartPart;