import React, { useEffect, useState } from 'react'

function Cart() {
    const [products, setProducts] = useState([])
    const [cartItem, setCartItem] = useState([])

    async function callData() {
        const apidata = await fetch('https://fakestoreapi.com/products')
        const jsData = await apidata.json()
        setProducts(jsData.slice(0, 5))

    }

    useEffect(() => {
        callData()
    }, [])

    function addItem(p) {
        setCartItem([...cartItem, { ...p, "qty": 1 }])
    }

    function removeItem(p) {
        setCartItem(cartItem.filter((i) => i.id != p))
    }
    // Calculate total
    const total = cartItem.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            {/* <div style={{ textAlign: "right" }}><button onClick={() =>}>Go to Cart</button></div> */}
            <div style={{ display: "grid", gap: "30px", gridTemplateColumns: "repeat(3,1fr)", maxWidth: "800px", margin: "0 auto" }}>
                {
                    products.map((i) => (
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                            <h4 style={{ margin: "0" }}>{i.title}</h4>
                            <img src={i.image} width="150px" height="150px" />
                            <div>{i.price} Rupees</div>
                            <button onClick={() => addItem(i)}>Add to cart</button>
                        </div>
                    ))
                }
            </div>
            {cartItem.length > 0 && (
                <div>
                    <h5>Cart</h5>
                    {cartItem.map((i) => (
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                            <h4 style={{ margin: "0" }}>{i.title}</h4>
                            <img src={i.image} width="150px" height="150px" />
                            <div>{i.price} Rupees</div>
                            <button onClick={() => removeItem(i.id)}>Remove</button>
                        </div>
                    ))}
                    <h6 style={{ textAlign: "center" }}>Total : {total}</h6>
                </div>

            )}
        </>

    )
}

export default Cart
