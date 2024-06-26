const units: string[] = [
    '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
    'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
  ];
  
  const tens: string[] = [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'
  ];
  
  const scales: string[] = ['', 'mille', 'million', 'milliard'];
  
  function convert_hundreds(n: number): string {
    let result = '';
    if (n >= 100) {
      const hundreds = Math.floor(n / 100);
      result += hundreds === 1 ? 'cent' : units[hundreds] + ' cent';
      n %= 100;
      if (n > 0) {
        result += ' ';
      }
    }
    if (n > 0) {
      result += convert_tens(n);
    }
    return result;
  }
  
  function convert_tens(n: number): string {
    if (n < 20) {
      return units[n];
    }
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    let result = tens[ten];
    if (unit > 0) {
      result += '-' + units[unit];
    }
    return result;
  }
  
  export function numberToWords(n: number): string {
    if (n === 0) {
      return 'zéro';
    }
    if (n < 0) {
      return 'moins ' + numberToWords(-n);
    }
    let result = '';
    let scale = 0;
    while (n > 0) {
      const chunk = n % 1000;
      if (chunk > 0) {
        const chunkStr = convert_hundreds(chunk);
        if (scale > 0) {
          result = chunkStr + ' ' + scales[scale] + ' ' + result;
        } else {
          result = chunkStr + ' ' + result;
        }
      }
      n = Math.floor(n / 1000);
      scale++;
    }
    return result.trim();
  }
  
  // Exemple d'utilisation
  console.log(numberToWords(123456)); // "cent vingt-trois mille quatre cent cinquante-six"
  