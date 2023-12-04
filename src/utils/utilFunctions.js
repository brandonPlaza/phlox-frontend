export const frequencyOfNodeOutOfService = (node) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let outOfServicePeriods = new Set();
  let ongoingIssue = false;

  node.reports.forEach((report) => {
    const reportedAt = new Date(report.reportedAt);
    if (reportedAt >= thirtyDaysAgo) {
      if (report.resolvedAt) {
        outOfServicePeriods.add(report.resolvedAt);
      } else {
        ongoingIssue = true;
      }
    }
  });

  return ongoingIssue ? outOfServicePeriods.size + 1 : outOfServicePeriods.size;
};

export const averageResolutionTime = (node) => {
  let totalResolutionTime = 0;
  let resolutionCount = 0;

  node.reports.forEach((report) => {
    console.log(report);
    if (report.resolvedAt) {
      console.log(report.resolvedAt);
      const reportedAt = new Date(report.reportedAt);
      const resolvedAt = new Date(report.resolvedAt);
      const resolutionTime = (resolvedAt - reportedAt) / (1000 * 60 * 60); // Convert milliseconds to hours
      totalResolutionTime += resolutionTime;
      resolutionCount++;
    }
  });

  return resolutionCount > 0
    ? `${(totalResolutionTime / resolutionCount).toFixed(2)} hours`
    : "No resolved entries found";
};
