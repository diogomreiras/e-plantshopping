import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeItem, updateQuantity } from './CartSlice';
import { formatCost } from "./helpers";
import './CartItem.css';

const CartItem = ({ onContinueShopping, currency }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;

    for (const plantName in cart) {
      totalAmount += cart[plantName].cost * cart[plantName].quantity;
    }

    return formatCost(totalAmount * (currency.factor || 1), currency.symbol, currency.decimals);
  };

  // Calculate sub-total cost for a given plant
  const calculatePlantTotalCost = (plant) => {
    let totalAmount = cart[plant.name].cost * cart[plant.name].quantity;
    return formatCost(totalAmount * (currency.factor || 1), currency.symbol, currency.decimals);
  };

  // Go to product list
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    confirm("Did you enjoy the experience of using our website?\nThis is the end of its development as of now.\nStay tunned for updates!")
  };

  const handleIncrement = (plant) => {
    dispatch(updateQuantity({ plant: plant, quantity: cart[plant.name].quantity + 1 })); // Dispatch the action to add one time this plant to the cart
  };

  const handleDecrement = (plant) => {
    dispatch(updateQuantity({ plant: plant, quantity: cart[plant.name].quantity - 1 })); // Dispatch the action to remove one time this plant to the cart
  };

  const handleRemove = (plant) => {
    dispatch(removeItem(plant)); // Dispatch the action to add (anoter) time this plant to the cart
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: {calculateTotalAmount()}</h2>
      <div>
        {Object.values(cart).map(plant => (
          <div className="cart-item" key={plant.name}>
            <img className="cart-item-image" src={plant.image} alt={plant.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{plant.name}</div>
              <div className="cart-item-cost">{formatCost(
                plant.cost * (currency.factor || 1),
                currency.symbol,
                currency.decimals
              )}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(plant)}>-</button>
                <span className="cart-item-quantity-value">{plant.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(plant)}>+</button>
              </div>
              <div className="cart-item-total">Total: {calculatePlantTotalCost(plant)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(plant)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
