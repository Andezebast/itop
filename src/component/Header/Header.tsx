import React, { FC } from "react";
import styles from "./header.module.scss";
import { useAppSelector } from "../../hooks/redux";
import Itop from "./img/itop.jpg";
/*--------------------------*/
const Header: FC = () => {
  const currencies = useAppSelector((state) => state.courseSlice.сurrencies);
  /*--------------------------*/
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <img src={Itop} alt="logo" />
        </div>
        <div className={styles.headerCurrencies}>
          {currencies.map((currency, index) => (
            <div key={index} className={styles.headerCurrency}>
              <p>
                <span>Course </span>
                {currency.ccy}/{currency.base_ccy}:
              </p>
              <p>
                <span>Buy</span>
                {parseFloat(currency.buy).toFixed(2)}
              </p>
              <p>
                <span>Sale</span>
                {parseFloat(currency.sale).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
