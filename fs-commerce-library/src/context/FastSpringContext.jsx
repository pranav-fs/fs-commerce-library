import React, { createContext, useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const FastSpringContext = createContext();

export const useFastSpring = () => useContext(FastSpringContext);

export const FastSpringProvider = ({ children, storefrontURL }) => {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});
    const location = useLocation();

    const storefront = storefrontURL || "assignmentse.test.onfastspring.com/embedded-test";
    const SCRIPT_URL = "https://sbl.onfastspring.com/sbl/0.9.5/fastspring-builder.min.js";



    // Set opacity to 0 for elements with the same ID
    // const setOpacityToZero = () => {
    //     const elements = document.querySelectorAll("#fsc-embedded-checkout-skeleton");
    //     elements.forEach((element) => {
    //         if (element.style.opacity !== "0") {
    //             element.style.opacity = "0";
    //             element.style.transition = "opacity 0.5s ease-in-out";
    //         }
    //     });
    // };

    const setOpacityToZero = () => {
        const elements = document.querySelectorAll("#fsc-embedded-checkout-skeleton");
        elements.forEach((element) => {
            if (element.style.opacity !== "0") {
                element.style.opacity = "0";
                element.style.transition = "opacity 0.5s ease-in-out";
            }
        });
    };

    // Load the embedded SBL script for checkout
    const loadCheckoutScript = () => {
        const scriptId = "fsc-api-second";
        let script = document.getElementById(scriptId);
        if (!script) {
            script = document.createElement("script");
            script.type = "text/javascript";
            script.id = scriptId;
            script.setAttribute("data-continuous", "true");
            script.src = SCRIPT_URL;
            script.dataset.storefront = storefront;
            document.body.appendChild(script);
        }
        return script;
    };

    // Remove the embedded SBL script
    const removeCheckoutScript = () => {
        const scriptId = "fsc-api-second";
        const scriptToRemove = document.getElementById(scriptId);
        if (scriptToRemove) {
            scriptToRemove.remove();
        }
    };

    // function to reload the embedded SBL script
    const reloadCheckoutScript = () => {
        removeCheckoutScript();
        loadCheckoutScript();
    };

    // Load FastSpring SBL script and manage embedded script
    useEffect(() => {
        const fastSpringCallBack = (data) => {
            setData(data);
            console.log("FastSpring data: ", data);
            if (data && data.groups) {
                const newProducts = [];
                data.groups.forEach((group) => {
                    if (group.items && Array.isArray(group.items)) {
                        group.items.forEach((item) => {
                            newProducts.push(item);
                        });
                    }
                });
                setProducts(newProducts);
                console.log("Products: ", newProducts);
            }
        };


        window.fastSpringCallBack = fastSpringCallBack;

        const addSBL = () => {
            const scriptId = "fsc-api";
            let script = document.getElementById(scriptId);
            if (!script) {
                script = document.createElement("script");
                script.type = "text/javascript";
                script.id = scriptId;
                script.setAttribute("data-continuous", "true");
                script.src = SCRIPT_URL;
                script.dataset.storefront = storefront;
                script.setAttribute("data-data-callBack", "fastSpringCallBack");
                script.setAttribute(
                    "data-popup-webhook-received",
                    "dataPopupWebhookReceived"
                );
                document.body.appendChild(script);
            }
        };

        // Load SBL consistently
        addSBL();
        console.log("FastSpring SBL script loaded");

        if (location.pathname === "/checkout") {
            // Load EmbeddedSBL only on the checkout page
            const checkoutScript = loadCheckoutScript();
            checkoutScript.onload = () => {
                // Set opacity to 0 for elements with the same ID after a 3-second delay
                setTimeout(() => {
                    setOpacityToZero();
                }, 1500);
            };
        } else {
            setTimeout(() => {
                    setOpacityToZero();
                }, 1500);
            // Remove EmbeddedSBL on pages other than checkout
            removeCheckoutScript();
        }

        // Cleanup function
        return () => {
            const scriptToCleanUp = document.getElementById("fsc-api");
            if (scriptToCleanUp) {
                scriptToCleanUp.remove();
            }
            removeCheckoutScript();
        };
    }, [location]);

    return (
        <FastSpringContext.Provider value={{ data, products, reloadCheckoutScript }}>
            {children}
        </FastSpringContext.Provider>
    );
};
