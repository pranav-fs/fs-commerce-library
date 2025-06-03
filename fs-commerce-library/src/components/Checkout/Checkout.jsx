import React, { useEffect, useState } from "react";
import { useFastSpring } from "../../context/FastSpringContext";
import "./Checkout.css"; // Assuming you have a CSS file for styling

const Checkout = () => {
    const { products } = useFastSpring();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [crossSale, setCrossSale] = useState(null);
    // const [loadCheckout, setLoadCheckout] = useState(true);

    useEffect(() => {
        // Filter the products and set the selectedProducts state
        const filteredProducts = products.filter(
            (product) => product.selected === true
        );
        setSelectedProducts(filteredProducts);
    }, [products]);

    useEffect(() => {
        // Filter the products and set the crossSale state if the product exists
        const fxlabSub = products.find(
            (product) => product.path === "fxlab-subscription"
        );
        setCrossSale(fxlabSub);
    }, [products]);

    useEffect(() => {
        // Function to reload the embedded checkout
        // const reloadCheckout = () => {
        //   setLoadCheckout(false);
        //   // Ensure the DOM has updated before remounting the checkout
        //   setTimeout(() => setLoadCheckout(true), 200);
        // };

        // Define the dataPopupWebhookReceived function and bind it to the window object
        const dataPopupWebhookReceived = (orderReference) => {
            if (orderReference) {
                console.log(orderReference.id);
                // Assuming fastspring.builder.reset() is a valid method you need to call
                window.fastspring.builder.reset();
                // Trigger the checkout to reload
                // reloadCheckout();
                // Set a timer to reload the page 5 seconds after a successful operation
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // Adjust time as needed
            } else {
                console.log("No order ID");
            }
        };

        // Bind the function to the window object
        window.dataPopupWebhookReceived = dataPopupWebhookReceived;

        // Cleanup function to remove the reference when the component unmounts
        return () => {
            delete window.dataPopupWebhookReceived;
        };
    }, []); // The empty array ensures this effect runs once on mount and cleanup on unmount

    // Function to remove a product by its path
    const removeProduct = (path) => {
        window.fastspring.builder.remove(path);
    };

    // Check if "fxlab-subscription" is not in selected products
    const isCrossSaleEligible = !selectedProducts.some(
        (product) => product.path === "fxlab-subscription"
    );

    return (
        <div className="checkout-page">
            <div className="container-fluid py-5">
                <div className="row flex-lg-nowrap">
                    {/* Cart Summary - Auto Width on Larger Screens */}
                    <div className="col-12 col-md-6 p-3" style={{ minWidth: "320px" }}>
                        <h4 className="mb-3">Your Cart</h4>
                        <ul className="list-group mb-3">
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <li
                                        key={product.path}
                                        className="list-group-item d-flex align-items-center gap-3"
                                    >
                                        <div className="d-flex flex-row align-items-center">
                                            <div>
                                                <img
                                                    src={product.image}
                                                    alt={product.path}
                                                    className="img-fluid rounded-3"
                                                    style={{ width: "65px" }}
                                                />
                                            </div>
                                            <div className="ms-3">
                                                <h4>{product.display}</h4>
                                                <h5 className="small mb-0">Price: {product.price}</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center justify-content-end ms-auto">
                                            <button
                                                className="btn btn-link text-decoration-none me-3"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeProduct(product.path);
                                                }}
                                                aria-label="Remove product"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">
                                    <p className="mb-0">No products selected</p>
                                </li>
                            )}
                        </ul>

                        {isCrossSaleEligible && crossSale && (
                            <div className="mt-4">
                                <p className="fw-bold mb-2">You might also be interested in...</p>
                                <div className="card">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={crossSale.image}
                                                alt={crossSale.path}
                                                className="img-fluid rounded-3 me-3"
                                                style={{ width: "65px" }}
                                            />
                                            <div>
                                                <p className="mb-1 fw-bold">{crossSale.display}</p>
                                                <small className="text-muted">Price: {crossSale.price}</small>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() => window.fastspring.builder.add(crossSale.path)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Checkout Section - Takes remaining space */}
                    <div
                        className="col-12 col-md-6 p-3"
                        id="fsc-embedded-checkout-container"
                        style={{ maxWidth: "100%", position: "relative" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
