import React from 'react'
import styles from '../css/Checkout.module.css'

const Checkout = ({item}) => {
  return (
    <div className={styles.outer}>
      <div className={styles.containerGrid}>
        <div className={styles.leftGrid}>
          <div className={styles.imageText}>
            <img src={item.product.images[0].image} alt={item.product.name} />
            <div>
              <h3>{item.product.name}</h3>
              <h3>Quantity: {item.quantity}</h3>
            </div>
          </div>
        </div>
        <div className={styles.RightGrid}>
          <div className={styles.priceCont}>
            <h3>${item.product.price}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout