const formRow = (label, input) => {
  const formRowItems = document.createElement("ul");
  const formRowLabelItem = document.createElement("li");
  const formRowInputItem = document.createElement("li");

  const formLabel = document.createElement("label");
  formLabel.for = label;
  formLabel.textContent = label;

  formRowLabelItem.appendChild(formLabel);

  if (label !== "priority") {
    const formInput = document.createElement("input");
    Object.assign(formInput, input);
    formRowInputItem.appendChild(formInput);
  } else {
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
  }

  formRowItems.appendChild(formRowLabelItem);
  formRowItems.appendChild(formRowInputItem);

  return formRowItems;
};

export default formRow;
