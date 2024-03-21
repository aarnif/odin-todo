const plusIcon = () => {
  const iconContainer = document.createElement("div");
  iconContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="plus-icon">
  <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
  </svg>`;
  return iconContainer;
};

export default plusIcon;
