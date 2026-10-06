import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of items in the cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
          description: "Removes mold spores and purifies indoor air.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop",
          description: "Calming scent, used in aromatherapy and relaxation.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729800077-ac04001d9246?q=80&w=1000&auto=format&fit=crop",
          description: "Sweet fragrance, promotes relaxation and sleep.",
          cost: "$15"
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating aroma, enhances memory and focus.",
          cost: "$12"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" style={{ height: '50px' }} />
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', marginLeft: '10px' }}>
              <div>
                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                <i style={{ color: 'white', fontSize: '12px' }}>Where Greenery Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <a href="#" onClick={(e) => handleContinueShopping(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Plants</a>
          <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none', position: 'relative' }}>
            🛒 <span className="cart_quantity_count" style={{ backgroundColor: 'red', borderRadius: '50%', padding: '2px 8px', fontSize: '14px' }}>{totalQuantity}</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 style={{ textAlign: 'center', margin: '20px 0' }}>{category.category}</h2>
              <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center' }}>
                    <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div className="product-title" style={{ fontWeight: 'bold', margin: '10px 0' }}>{plant.name}</div>
                    <div className="product-description" style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{plant.description}</div>
                    <div className="product-cost" style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{
                        backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
