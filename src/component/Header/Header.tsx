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
                <span>Курс </span>
                {currency.ccy}/{currency.base_ccy}:
              </p>
              <p>
                <span>Покупка</span>
                {currency.buy}
              </p>
              <p>
                <span>Продажа</span>
                {currency.sale}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
