import { helper } from '@ember/component/helper';

// By default return Date.toDateString()

export function dateFormatter([date]) {
  if (date) {
    return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
  } else {
    return '';
  }
}

export default helper(dateFormatter);
