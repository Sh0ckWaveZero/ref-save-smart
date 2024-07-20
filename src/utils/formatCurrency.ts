export const formatCurrency = (value: number, locale = 'th-TH', currency = 'THB') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};