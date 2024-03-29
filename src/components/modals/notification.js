const notificationModal = (message) => {
  const dialog = document.createElement("dialog");
  dialog.id = "notification-modal";

  // Disable, because will not remove the dialog from the DOM when pressing the escape key in Chrome
  dialog.addEventListener("cancel", (event) => event.preventDefault());

  const dialogMessage = document.createElement("h2");
  dialogMessage.className = "header2 mb-4 text-center";
  dialogMessage.textContent = message;

  dialog.appendChild(dialogMessage);

  const okButton = document.createElement("button");
  okButton.id = "ok-button";
  okButton.className = "ok-button";
  okButton.type = "button";

  okButton.textContent = "OK";

  okButton.addEventListener("click", () => {
    dialog.close();
    document.body.removeChild(dialog);
  });

  dialog.appendChild(okButton);

  return dialog;
};

const addNotificationModal = (message) => {
  const notificationModalElement = notificationModal(message);
  document.body.appendChild(notificationModalElement);
  const dialog = document.getElementById("notification-modal");
  dialog.showModal();
};

export default addNotificationModal;
