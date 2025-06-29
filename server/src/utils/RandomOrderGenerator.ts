export function generateOrderId() {
  const now = new Date();

  const year = now.getFullYear().toString().slice(-2); 
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  const day = now.getDate().toString().padStart(2, '0');

  const dateCode = `0${year}${month}${day}`; 
  const randomPart = Math.floor(100000000 + Math.random() * 900000000); // 

  return `#ORD${dateCode}${randomPart}`;
}


export function generateRandomAlphanumericString(length = 21) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}