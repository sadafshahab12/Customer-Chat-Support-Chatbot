const adjustTextareaHeight = (ele, setIsExpanded) => {
  ele.style.height = "50px";
  const newHeight = Math.max(ele.scrollHeight, 28);
  ele.style.height = newHeight + "px";
  setIsExpanded(newHeight > 50);
};

export { adjustTextareaHeight };
