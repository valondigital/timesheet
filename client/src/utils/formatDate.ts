export const formatDate = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
};

export const formatDateWithoutTime = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

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
      timeZone: "GMT",
    });
  }
};

export const calculateDateDifference = (
  date1: string | undefined,
  date2: string | undefined
) => {
  if (date1 && date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Ensure valid date objects
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format");
    }

    // Calculate the time difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    console.log({daysDifference})

    return daysDifference;
  }
};
