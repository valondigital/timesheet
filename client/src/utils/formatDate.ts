export const formatDate = (dateString: string ) =>{
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export const formatDateTwo = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "GMT"
    });
  }
};