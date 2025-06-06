//main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reactToWebComponent from 'react-to-webcomponent';

class CheckoutWebComponent extends HTMLElement {
  connectedCallback(){
    const store = this.getAttribute('store');

    const root = ReactDOM.createRoot(this);
    root.render(
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    );
  }
}

// const WebComponent = reactToWebComponent(App, React, ReactDOM);
customElements.define('checkout-component', CheckoutWebComponent);