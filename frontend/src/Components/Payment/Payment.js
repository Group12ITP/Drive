import React from 'react';
import './PaymentForm.css';

const PaymentForm = () => {
  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2 className="brand">Meiranpay</h2>
        
        <label>Card Number</label>
        <input type="text" placeholder="xxxx - xxxx - xxxx - xxxx" maxLength="19" />

        <label>CVV Number</label>
        <input type="text" placeholder="e.g. 123" maxLength="4" />

        <label>Expiry Date</label>
        <div className="expiry-fields">
          <input type="text" placeholder="MM" maxLength="2" />
          <input type="text" placeholder="YY" maxLength="2" />
        </div>

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <button className="pay-button">Pay Now</button>
      </div>

      <div className="payment-summary">
        <div className="card-visual">
          <p className="card-name">Aduke Morewa</p>
          <p className="card-last4">**** 3456</p>
          <p className="card-expiry">09/24</p>
        </div>
        <ul className="order-details">
          <li><strong>Company:</strong> Samsung</li>
          <li><strong>Order Number:</strong> 1443356</li>
          <li><strong>Product:</strong> Galaxy S22</li>
          <li><strong>VAT (20%):</strong> $100.00</li>
        </ul>
        <div className="total-pay">
          <p>You have to Pay</p>
          <h3>$800.00 USD</h3>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
