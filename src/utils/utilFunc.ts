export const generateOtp = (length = 6): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a single digit
  }
  return otp;
};
export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");

  if (user && user.length > 1) {
    const visiblePart = user.substring(0, 3);
    const maskedPart =
      visiblePart + "*".repeat(user.length - visiblePart.length);

    return `${maskedPart}@${domain}`;
  }

  return email;
};

type PageNumberTile = number | "...";

export const generatePagination = (
  currentPage: number,
  totalPages: number,
  contextPages: number = 4
): PageNumberTile[] => {
  const pages: PageNumberTile[] = [];

  pages.push(1);


  const startContext = Math.max(currentPage - contextPages, 2);
  const endContext = Math.min(currentPage + contextPages, totalPages - 1);

  if (startContext > 2) {
    pages.push("...");
  }

  for (let i = startContext; i <= endContext; i++) {
    pages.push(i);
  }

  if (endContext < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
