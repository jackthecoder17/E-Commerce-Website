import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';

import  {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goTOCheckoutHandler = () => navigate('/checkout');
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)) : (
                        <EmptyMessage>Your Cart is empty</EmptyMessage>
                    )
                }
            
            </CartItems>
            <Button
            onClick={goTOCheckoutHandler}
            style={{
                fontSize: '0.7rem',
            }}
            >GO TO CHECKOUT</Button>
         </CartDropdownContainer>   
    )
}
export default CartDropdown;