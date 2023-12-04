import React, { FC, useEffect, useState } from "react";
import styles from "./converter.module.scss";
import { fetchСurrencies } from "../../store/currenciesSlice";
import { useAppDispatch } from "../../hooks/redux";
import ConverterSvg from "../../svg/ConverterSvg";
import { useAppSelector } from "../../hooks/redux";
/*--------------------------*/
const Converter: FC = () => {
  const currencies = useAppSelector((state) => state.courseSlice.сurrencies);
  /*--------------------------*/
  const [currencyS1, setCurrencyS1] = useState<string>("uah");
  const [currencyS2, setCurrencyS2] = useState<string>("usd");
  const [amountI1, setAmountI1] = useState<number>(0);
  const [amountI2, setAmountI2] = useState<number>(0);
  /*--------------------------*/
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchСurrencies());
  }, []);
  /*--------------------------*/
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.id === "firstSelect") {
      setCurrencyS1(event.target.value);
    } else {
      setCurrencyS2(event.target.value);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentCurrency: string = "";
    let nextCurrency: string = "";
    const currentAmount: number = parseInt(event.target.value);
    if (event.target.id === "firstInput") {
      currentCurrency = currencyS1;
      nextCurrency = currencyS2;
      const result: number = calculateNextAmount(
        currentAmount,
        currentCurrency,
        nextCurrency
      );
      setAmountI1(currentAmount);
      setAmountI2(result);
    } else {
      currentCurrency = currencyS2;
      nextCurrency = currencyS1;
      const result: number = calculateNextAmount(
        currentAmount,
        currentCurrency,
        nextCurrency
      );
      setAmountI1(result);
      setAmountI2(currentAmount);
    }
  };

  const calculateNextAmount = (
    currentAmount: number,
    currentCurrency: string,
    nextCurrency: string
  ): number => {
    /*--------------------------*/
    const currencyObj = {
      eur: {
        buy: currencies[0].buy,
        sale: currencies[0].sale,
      },
      usd: {
        buy: currencies[1].buy,
        sale: currencies[1].sale,
      },
    };
    console.log(currencyObj, "currencyObj");
    /*--------------------------*/
    let currentResult: number = 0;
    if (currentCurrency === "uah" || nextCurrency === "uah") {
      if (currentCurrency === "uah") {
      } else {
      }
    } else {
    }

    return currentResult;
  };
  /*--------------------------*/
  return (
    <div className={styles.main}>
      <div className={styles.converter}>
        <div className={styles.converterTitle}>
          <p>Converter</p>
        </div>
        <div className={styles.converterContainer}>
          <div className={styles.converterInput}>
            <input
              type="number"
              min="0"
              id="firstInput"
              value={amountI1}
              onChange={handleInputChange}
            />
            <select
              name="firstSelect"
              id="firstSelect"
              onChange={handleSelectChange}
            >
              <option value="uah">UAH</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
          <div className={styles.converterImage}>
            <ConverterSvg />
          </div>
          <div className={styles.converterInput}>
            <input
              type="number"
              min="0"
              id="secondInput"
              value={amountI2}
              onChange={handleInputChange}
            />
            <select
              name="secondSelect"
              id="secondSelect"
              onChange={handleSelectChange}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="uah">UAH</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
