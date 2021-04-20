// this function is used to display custom format of date post/comment

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// milliseconds to days, hours and minutes conversion factor
const NUMERATORS = [24 * 3600 * 1000, 3600 * 1000, 60 * 1000];

export function getDateFormatted(date) {
  const d = new Date(date);
  const now = new Date();

  const millisecondsDiff = now - d;

  // if this difference is smaller than 0, something when wrong
  if (millisecondsDiff < 0) {
    return 'Seems your post/comment has time-travelled...';
  }

  // compute days, hour and minutes differences between now date/hour and post/comment's creation date/hour
  const diffs = NUMERATORS.map((num) => Math.floor(millisecondsDiff / num));
  const [dayDiff, hoursDiff, minutesDiff] = diffs;

  // post/comment created more than 1 day ago --> display whole date and hour
  if (dayDiff > 1) {
    // prepending 0 to single-digit minutes numbers
    const minutes = d
      .getMinutes()
      .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    return `${d.getDate()} ${monthNames[d.getMonth()]} at ${d.getHours()}:${minutes}`;
  }

  // post/comment created 1 day ago --> display 'Yesterday'
  if (dayDiff === 1) {
    return 'Yesterday';
  }

  // post/comment created more then one hour ago --> display number of hours
  if (hoursDiff > 0) {
    return `${hoursDiff} h`;
  }

  // post/comment created between 1 and 59 minutes ago --> display number of minutes
  if (minutesDiff > 0) {
    return `${minutesDiff} min`;
  }

  // post/comment created less than 1 minute ago --> display 'Now'
  return `Now`;
}
