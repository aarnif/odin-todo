const formButtons = (cancelButtonAttributes, submitButtonAttributes) => {
  const formButtonsContainer = document.createElement("ul");
  formButtonsContainer.className = "form-buttons";

  const cancelButtonContainer = document.createElement("li");
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-button";
  Object.assign(cancelButton, cancelButtonAttributes);
  cancelButtonContainer.appendChild(cancelButton);

  const submitButtonContainer = document.createElement("li");
  const submitButton = document.createElement("button");
  submitButton.className = "submit-button";
  Object.assign(submitButton, submitButtonAttributes);
  submitButtonContainer.appendChild(submitButton);

  formButtonsContainer.appendChild(cancelButtonContainer);
  formButtonsContainer.appendChild(submitButtonContainer);

  return formButtonsContainer;
};

export default formButtons;
