import dayjs from 'dayjs';

export function formatReadableTimeAgo({ time }: { time: number }) {
  if (!time) {
    return '';
  }
  const start = dayjs(time);
  const end = dayjs();
  const diffHours = end.diff(start, 'h');
  if (diffHours > 24) {
    return start.format('YYYY/MM/DD HH:MM');
  }
  if (diffHours >= 1) {
    return `${diffHours}h ago`;
  }
  const diffMinute = end.diff(start, 'm');
  if (diffMinute >= 1) {
    return `${diffMinute}min ago`;
  }
  return `${end.diff(start, 's')}s`;
}
