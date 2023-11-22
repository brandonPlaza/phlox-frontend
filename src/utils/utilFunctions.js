// utilFunctions.js
// utilFunctions.js
export const frequencyOfNodeOutOfService = (node) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let frequency = 0;

  node.outOfServiceHistory.forEach((history) => {
    const reportedAt = new Date(history.reportedAt);
    if (reportedAt >= thirtyDaysAgo) {
      frequency++;
    }
  });

  return frequency;
};

export const averageResolutionTime = (node) => {
  let totalResolutionTime = 0;
  let resolutionCount = 0;

  node.outOfServiceHistory.forEach((history) => {
    if (history.resolvedAt) {
      const reportedAt = new Date(history.reportedAt);
      const resolvedAt = new Date(history.resolvedAt);
      const resolutionTime = (resolvedAt - reportedAt) / (1000 * 60 * 60); // Convert milliseconds to hours
      totalResolutionTime += resolutionTime;
      resolutionCount++;
    }
  });

  return resolutionCount > 0
    ? `${(totalResolutionTime / resolutionCount).toFixed(2)} hours`
    : "No resolved entries found";
};
