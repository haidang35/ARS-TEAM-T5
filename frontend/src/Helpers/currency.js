const formatterVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const formatCurrencyToVND = (number) => {
    return formatterVND.format(number);
};

export const formatCurrencyToUSD = (number) => {
    return formatterUSD.format(number);
};

export const formatCash = (str, currency = "") => {
    return str
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev + currency;
        });
};


export default function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? formatCryptoUSDCurrency(
          (num / item.value).toFixed(digits).replace(rx, "$1")
        ) + item.symbol
      : formatCryptoUSDCurrency(0);
  }
  
