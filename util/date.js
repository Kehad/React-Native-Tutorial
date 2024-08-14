export function getFormattedDate(date) {
  return (
    `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  )
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
        randomText += characters[Math.floor(Math.random() * characters.length)];
    }

    return randomText;
}

export function generateFormattedDate() {
  const date = new Date();
    
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}