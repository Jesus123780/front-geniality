let interval: ReturnType<typeof setTimeout>;

export const debounce = (cb: () => void, delay = 250): void => {
  clearTimeout(interval);
  interval = setTimeout(() => {
    cb();
  }, delay);
}

export function verifyCheckDigit(imei: string): boolean {
    const checkDigit = imei.substring(imei.length - 1);
    const rest = imei.substring(0, imei.length - 1);
    const digits = rest.split('');
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i]);
      const numbers: string[] = ((i + 1) % 2 === 0) ? (digit * 2).toString().split('') : [digit.toString()];
      for (const element of numbers) {
        const number = parseInt(element);
        sum += number;
      }
    }
    return (sum + parseInt(checkDigit)) % 10 === 0;
  }


export const verifyIMEI = (imei: string): boolean => {
    if (isNaN(Number(imei))) {
      return false;
    }
    if (imei.length >= 14 && imei.length <= 17) {
      if (verifyCheckDigit(imei)) {
        return true;
      }
    }
    return false;
  }