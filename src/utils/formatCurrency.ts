export const formatCurrency = (value: number, locale: string = 'th-TH', currency: string = 'THB') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};