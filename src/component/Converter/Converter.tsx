import React, { FC, useEffect, useState } from "react";
import styles from "./converter.module.scss";
import { fetchСurrencies } from "../../store/currenciesSlice";
import { useAppDispatch } from "../../hooks/redux";
import ConverterSvg from "../../svg/ConverterSvg";
import { useAppSelector } from "../../hooks/redux";
import { ICurrencies } from "../../models/ICurrencies";
/*--------------------------*/
const BASE_CURRENCY = "uah";
const ERROR_MESSAGE = "Something gone wrong!";
/*--------------------------*/
const Converter: FC = () => {
  const currencies = useAppSelector((state) => state.courseSlice.сurrencies);
  /*--------------------------*/
  const [saleCurrency, setSaleCurrency] = useState<string>("");
  const [buyCurrency, setBuyCurrency] = useState<string>("");
  const [amountSale, setAmountSale] = useState<string>("");
  const [amountBuy, setAmountBuy] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  /*--------------------------*/
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchСurrencies());
  }, []);
  useEffect(() => {
    setSaleCurrency(currencies[0]?.base_ccy);
    setBuyCurrency(currencies[1]?.ccy);
  }, [currencies]);
  /*--------------------------*/
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setError(false);
    if (event.target.id === "firstSelect") {
      setSaleCurrency(event.target.value);
      changeAmount("firstInput", amountSale, event.target.value);
    } else {
      setBuyCurrency(event.target.value);
      changeAmount("secondInput", amountBuy, event.target.value);
    }
  };
  /*--------------------------*/
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeAmount(event.target.id, event.target.value.replace(/[^\d]/g, ""));
  };
  /*--------------------------*/
  const changeAmount = (
    id: string,
    value?: string | number,
    currentValue?: string | undefined
  ) => {
    setError(false);
    let currentCurrency: string = "";
    let nextCurrency: string = "";
    const currentAmount: number = Number(value);
    if (id === "firstInput") {
      currentCurrency = currentValue || saleCurrency;
      nextCurrency = buyCurrency;
      const result: number | string = calculateNextAmount(
        currentAmount,
        currentCurrency.toLowerCase(),
        nextCurrency.toLowerCase()
      );
      if (typeof result === "string") return setError(true);
      setAmountSale(currentAmount.toString());
      setAmountBuy(result.toFixed(2));
    } else {
      currentCurrency = currentValue || buyCurrency;
      nextCurrency = saleCurrency;
      const result: number | string = calculateNextAmount(
        currentAmount,
        currentCurrency.toLowerCase(),
        nextCurrency.toLowerCase()
      );
      if (typeof result === "string") return setError(true);
      setAmountSale(result.toFixed(2));
      setAmountBuy(currentAmount.toString());
    }
  };
  /*--------------------------*/
  const calculateNextAmount = (
    currentAmount: number,
    currentCurrency: string,
    nextCurrency: string
  ): number | string => {
    let currentResult: number = 0;
    if (currentCurrency === BASE_CURRENCY || nextCurrency === BASE_CURRENCY) {
      if (currentCurrency === BASE_CURRENCY) {
        const findCurrencyResult = findCurrency(nextCurrency);
        if (!findCurrencyResult) return ERROR_MESSAGE;
        currentResult = currentAmount / Number(findCurrencyResult.sale);
      } else {
        const findCurrencyResult = findCurrency(currentCurrency);
        if (!findCurrencyResult) return ERROR_MESSAGE;
        currentResult = currentAmount * Number(findCurrencyResult.buy);
      }
    } else {
      const findCurrencyResultFirst = findCurrency(currentCurrency);
      const findCurrencyResultSecond = findCurrency(nextCurrency);
      if (!findCurrencyResultFirst || !findCurrencyResultSecond)
        return ERROR_MESSAGE;
      currentResult =
        (currentAmount * Number(findCurrencyResultFirst.buy)) /
        Number(findCurrencyResultSecond.sale);
    }
    return currentResult;
  };
  /*--------------------------*/
  const findCurrency = (currency: string): ICurrencies | undefined =>
    currencies.find(
      (item) => item.ccy.toLowerCase() === currency.toLowerCase()
    );
  /*--------------------------*/
  return (
    <>
      {currencies.length > 0 ? (
        <div className={styles.main}>
          <div className={styles.converter}>
            <div className={styles.converterTitle}>
              <p>Converter</p>
            </div>
            <div className={styles.converterSubTitle}>
              <p>Buy</p>
              <p>Sale</p>
            </div>
            <div className={styles.converterContainer}>
              <div className={styles.converterInput}>
                <input
                  type="text"
                  id="firstInput"
                  value={amountSale}
                  onChange={handleInputChange}
                />
                <select
                  name="firstSelect"
                  id="firstSelect"
                  value={saleCurrency}
                  onChange={handleSelectChange}
                >
                  <option
                    value={BASE_CURRENCY}
                    disabled={
                      !!buyCurrency &&
                      buyCurrency.toLowerCase() === BASE_CURRENCY
                    }
                  >
                    UAH
                  </option>
                  {currencies &&
                    currencies.map((currency, index) => (
                      <option
                        value={currency.ccy}
                        key={index}
                        disabled={
                          buyCurrency?.toLowerCase() ===
                          currency.ccy.toLowerCase()
                        }
                      >
                        {currency.ccy}
                      </option>
                    ))}
                </select>
              </div>
              <div className={styles.converterImage}>
                <ConverterSvg />
              </div>
              <div className={styles.converterInput}>
                <input
                  type="text"
                  id="secondInput"
                  value={amountBuy}
                  onChange={handleInputChange}
                />
                <select
                  name="secondSelect"
                  id="secondSelect"
                  onChange={handleSelectChange}
                  value={buyCurrency}
                >
                  <option
                    value={BASE_CURRENCY}
                    disabled={
                      !!saleCurrency &&
                      saleCurrency.toLowerCase() === BASE_CURRENCY
                    }
                  >
                    UAH
                  </option>
                  {currencies &&
                    currencies.map((currency, index) => (
                      <option
                        value={currency.ccy}
                        key={index}
                        disabled={
                          saleCurrency?.toLowerCase() ===
                          currency.ccy.toLowerCase()
                        }
                      >
                        {currency.ccy}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {error && <div className={styles.error}>{ERROR_MESSAGE}</div>}
        </div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </>
  );
};

export default Converter;
