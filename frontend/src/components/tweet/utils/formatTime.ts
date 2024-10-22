import { format, differenceInHours } from "date-fns";

export function formatTimeAgo(timestamp: any) {
  const pastDate = new Date(timestamp);
  const currentDate = new Date();

  const hoursDifference = differenceInHours(currentDate, pastDate);

  if (hoursDifference >= 24) {
    const formattedDate = format(pastDate, "MMM d");
    return formattedDate;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h${hoursDifference > 1 ? "" : ""} ago`;
  } else {
    return "Just now";
  }
}
