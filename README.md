# fs-commerce-library

A *standalone React-based Checkout UI* compiled into a *Web Component. It can be embedded and reused in **any web application*, whether it’s built with React, Angular, Vue, or plain HTML/JS.

---

## Features

- Written in React
- Packaged as a Web Component using react-to-webcomponent
- Easy to use in any consumer app via a single <script> tag
- Accepts store prop (storefront ID) as an HTML attribute

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-company/checkout-web-component.git
cd checkout-web-component
npm install
```

### 2. Build the Web component
```bash
npm run build
```

This will output a build in the `dist/` folder, including:
- `fs-commerce-library.iife.js`
- `fs-commerce-library.css`

## 📱 Using in a Consumer App

### Step 1: Copy Files
From `dist/` folder, copy:
- `fs-commerce-library.iife.js`
- `fs-commerce-library.css`
Paste them into consumer app (e.g., `public/libs/checkout/`

### Step 2: Include in HTML

#### Basic usage in HTML
```html
<link rel="stylesheet" href="/libs/checkout/fs-commerce-library.css" />
<script src="/libs/checkout/fs-commerce-library.iife.js"></script>

<checkout-component store="assignmentse.test.onfastspring.com/embedded-test"><checkout-component>
```
#### Usage in React App (like Vite or CRA)
Add the files in your `public` folder and then in your `index.html`:

```html
link rel="stylesheet" href="/libs/checkout/fs-commerce-library.css" />
<script src="/libs/checkout/fs-commerce-library.iife.js"></script>
```
In any react component
```jsx
<checkout-component store="assignmentse.test.onfastspring.com/embedded-test"><checkout-component>
```

```jsx
useEffect(() => {
 const el = document.createElment('checkout-component');
 el.setAttribute('store','assignmentse.test.onfastspring.com/embedded-test');
 document.getElementById('checkout').appendChild(el);
},[]);
```
```jsx
<div id="checkout"></div>
'''





