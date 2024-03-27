export function createNameInputModal() {
    // Create the modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none'; // Initially hidden

    // Create the modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create the form
    const nameInputForm = document.createElement('form');
    nameInputForm.id = 'nameInputForm';

    // Create the label
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'playerName');
    nameLabel.textContent = 'Enter your name:';

    // Create the input field
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'playerName';
    nameInput.name = 'playerName';
    nameInput.required = true;

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Start Game';

    // Append elements to the form
    nameInputForm.appendChild(nameLabel);
    nameInputForm.appendChild(nameInput);
    nameInputForm.appendChild(submitButton);

    // Append form to the modal content container
    modalContent.appendChild(nameInputForm);

    // Append modal content to the modal overlay
    modalOverlay.appendChild(modalContent);

    // Append the modal overlay to the body
    document.body.appendChild(modalOverlay);

    console.log('Modal for name input created and appended to the document body.');
}