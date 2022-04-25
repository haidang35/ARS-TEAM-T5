import React from "react";
import { Component } from "react";
import "./PayPalPayment.scss";
import { dateConvert, getTime } from "../../../../../Helpers/datetime";
import { Typography } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import publicService from "../../../Shared/Services/PublicService";
import { useEffect } from "react";

const initialOptions = {
  "client-id":
    "AUmxZucXArWx3PnoX5kze8LxBeJxkCTC-a8JFaYG5g9yigVFeYCK0jwbMImLmxv7h-o1GkAkm2GvtnNm",
  currency: "USD",
  intent: "capture",
  "data-client-token":
    "ELj49ADjRNyqvsZCTizrALH374nWJFJ5qELL0NU6AbD72SaHLB4b6WfHix-V6Lubr_SMfYQj4wFjfKrp",
};

const PayPalPayment = ({ totalMoney, onPayWithPayPal }) => {
  const [totalMoneyConverted, setTotalMoneyConverted] = useState(0);

  useEffect( () => {
     convertCurrency(totalMoney);
  }, []);

  const convertCurrency = async (totalMoney) => {
    const params = {
      format: "json",
      from: "VND",
      to: "USD",
      amount: totalMoney,
    };
    if (totalMoney > 0) {
      await publicService.convertCurrency(params).then((res) => {
        setTotalMoneyConverted(res.data.rates.USD.rate_for_amount);
      });
    }
  };
  
  return (
    <div id="paypal-payment">
      <div className="title-box">
        <Typography variant="h6" className="title">
          Paypal Payment
        </Typography>
      </div>
      <div className="content">
        <div className="btn-payment-paypal">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AUmxZucXArWx3PnoX5kze8LxBeJxkCTC-a8JFaYG5g9yigVFeYCK0jwbMImLmxv7h-o1GkAkm2GvtnNm",
            }}
          >
            <PayPalButtons
              forceReRender={[totalMoneyConverted]}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: Math.round(totalMoneyConverted * 100) / 100,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  onPayWithPayPal(details);
                });
              }}
              onError={() => {
                alert('Payment failed !')
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;
