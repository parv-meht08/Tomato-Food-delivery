/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : {};
    });
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
            if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        if (!cartItems || Object.keys(cartItems).length === 0) return 0;

        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * quantity : total;
        }, 0);
    };

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };

    const loadCartData = async () => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
        const serverCartItems = response.data.cartData || {};
        setCartItems(serverCartItems);
        localStorage.setItem("cartItems", JSON.stringify(serverCartItems));
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            if (token) {
                await loadCartData();
            }
        };
        loadData();
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
