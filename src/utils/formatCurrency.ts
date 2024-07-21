export const formatCurrency = (value: number, locale = 'th-TH', currency = 'THB') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value || 0);
};


export const calculatePercentage = (total: number, part: number): string => {
  if (typeof total !== 'number' || typeof part !== 'number' || total === 0 || isNaN(total) || part === 0 || isNaN(part)) {
    return '0.00%';
  }
  const percentage = (part / total) * 100;
  return percentage.toFixed(2) + '%';
};