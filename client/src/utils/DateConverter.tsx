export function formatDateToReadable(dateString: string) {
  const date = new Date(dateString);
  
  const day = date.getUTCDate(); 
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}