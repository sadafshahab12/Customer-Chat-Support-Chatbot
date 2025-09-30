const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date); // diff in milliseconds
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
};
export { getRelativeTime };

const adjustTextareaHeight = (ele, setIsExpanded) => {
  ele.style.height = "50px";
  const newHeight = Math.max(ele.scrollHeight, 28);
  ele.style.height = newHeight + "px";
  setIsExpanded(newHeight > 50);
};

export { adjustTextareaHeight };
