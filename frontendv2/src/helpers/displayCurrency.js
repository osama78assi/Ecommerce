const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-SY", {
    style: "currency",
    currency: "SYP",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayINRCurrency;
