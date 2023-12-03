import React, { FC, useEffect } from "react";
import styles from "./converter.module.scss";
import { useDispatch } from "react-redux";
import { fetchСurrencies } from "../../store/currenciesSlice";
/*--------------------------*/
const Converter: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchСurrencies());
  }, []);

  /*--------------------------*/
  return (
    <div className={styles.border}>
      <div className={styles.color}>Convertor</div>
      <div></div>
    </div>
  );
};

export default Converter;
