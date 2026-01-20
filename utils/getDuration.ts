export const getDuration = (startDate: Date, endDate?: Date | null) => {
  if (!endDate) return '진행중';
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 20) {
    return `${diffDays}일`;
  } else {
    const diffWeeks = Math.ceil(diffDays / 7);
    return `${diffWeeks}주`;
  }
};
