import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

const Accordion = ({ item, index, remove }) => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div className="accordion-item">
            <div className="accordion-title" key={index} onClick={() => setIsActive(!isActive)}> 
                <div>{item.name}</div>
                {/* <div>{isActive ? 'Hide' : 'Info'}</div> */}
            </div>
            {isActive && <div id ={item} className="accordion-content" onClick={() => remove(index)}><b>details: </b>
            <br/>
            </div>}
            </div>
        )
};

function App() {
    const storeItems = [
        { name: "pants", price: 48, stock: 3, image: "https://picsum.photos/500/120" },
        { name: "t-shirt", price: 19,stock: 5, image:"https://picsum.photos/500/120" },
        { name: "hooded sweatshirt", price: 36, stock: 4, image:"https://picsum.photos/500/120"},
        { name: "crewneck sweatshirt", price: 32, stock: 2, image:"https://picsum.photos/500/120" },
        { name: "tank", price: 17, stock: 6, image:"https://picsum.photos/500/120" },
        { name: "undies", price: 11, stock: 6, image:"https://picsum.photos/500/120" }
    ];

    const [stock, setStock] = useState(storeItems);
    const [cart, setCart]  = useState([]);
    const [total, setTotal] = useState(0);

    const addToCart = (index, e) => {
        let [itemName, rest] = e.target.innerHTML.split(':$');
        let [price, numInStock]= rest.split('-Stock=');
    //   console.log([price, numInStock]);

        let newCartItem = stock.filter(item => item.name == itemName && item.stock !== 0);
        setCart([...cart, ...newCartItem]);

        let newChargeItem = stock.filter(item => item.name == itemName && item.stock !== 0);
        setTotal(total + newChargeItem[0].price);

        let newStock = stock.map((item) => {
            if(item.name == itemName && item.stock == 0) alert(`${item.name} is unavailable`);
            if(item.name == itemName && item.stock > 0) item.stock--; 
            return item;
        });
        setStock(newStock);
  };

  const removeFromCart = (index) => {
        let currentCart = [...cart];
        let restockItem = currentCart.splice(index,1);
        setCart(currentCart);

        let restock = stock.map((item) => {
            if(item.name == restockItem[0].name) item.stock++;
            return item;
        });
        setStock(restock);

        let removeChargeItem = stock.filter((item) => item.name == restockItem[0].name);    
        setTotal(total - removeChargeItem[0].price);
    }

      let updatedStock = stock.map((item, index) => {    
        return (
                <Card className="col-md-" key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                    {/* <Card.Title>{item.name}:{item.stock}</Card.Title> */}
                    {/* <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text> */}
                        <Button onClick={e => addToCart(index, e)} variant="primary">{item.name}:${item.price}-Stock={item.stock}</Button>
                    </Card.Body>
                </Card>
        )
      });
  
      return(
      <>
        <div className="container">        
            <h1>Store</h1>
                <div className="row">
                    {updatedStock}
                </div>
            {/* <div className="d-flex justify-content-center">{updatedStock}</div> */}
            <h1>Shopping Cart</h1>
                <div className="accordion">
                        {(cart.map((item,index) =>
                            <Accordion key={ index } item={ item } index= { index } remove={ removeFromCart } />
                        ))}
                </div>
            <h1>Checkout</h1>
                    <Button>${total}</Button>
        </div>
      </> 
  );
}

export default App;
