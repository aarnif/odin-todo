const formRow = (label, input) => {
  const formRowItems = document.createElement("ul");
  const formRowLabelItem = document.createElement("li");
  const formRowInputItem = document.createElement("li");

  const formLabel = document.createElement("label");
  formLabel.for = label;
  formLabel.textContent = label;

  formRowLabelItem.appendChild(formLabel);

  if (label !== "priority" && label !== "description") {
    const formInput = document.createElement("input");
    Object.assign(formInput, input);
    formRowInputItem.appendChild(formInput);
  } else if (label === "priority") {
    const formSelect = document.createElement("select");
    formSelect.id = input.id;
    formSelect.name = input.id;
    formSelect.required = input.required;
    input.values.forEach((value) => {
      const formOption = document.createElement("option");
      formOption.value = value;
      formOption.textContent = value;
      formSelect.appendChild(formOption);
    });
    formRowInputItem.appendChild(formSelect);
  } else if (label === "description") {
    const formTextArea = document.createElement("textarea");
    formTextArea.id = input.id;
    formTextArea.name = input.name;
    formTextArea.value = input.value;
    formTextArea.placeholder = input.placeholder;
    formRowInputItem.appendChild(formTextArea);
  }

  formRowItems.appendChild(formRowLabelItem);
  formRowItems.appendChild(formRowInputItem);

  return formRowItems;
};

export default formRow;
