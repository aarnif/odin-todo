const content = () => {
  const contentAndFooter = document.createElement("div");
  contentAndFooter.setAttribute("id", "content-and-footer");

  const content = document.createElement("div");
  content.setAttribute("id", "content");

  contentAndFooter.appendChild(content);

  return contentAndFooter;
};

const addContent = () => {
  const wrapper = document.getElementById("wrapper");
  const contentElement = content();
  wrapper.appendChild(contentElement);
};

export default addContent;
