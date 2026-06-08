export function addedMessage() {
    const toastContainer = document.querySelector('.toast-container');

    const toast = document.createElement('div');
    toast.classList.add('toast-add');

    toast.innerHTML = `
        <img src="svg/check.svg" alt="Check icon">
        <p>Transaction Added</p>
    `;

    toastContainer.appendChild(toast);

    // show toast
    setTimeout(() => {
        toast.classList.add('js-added');
    }, 50);

    // auto hide
    setTimeout(() => {
        toast.classList.remove('js-added');

        setTimeout(() => {
            toast.remove();
        }, 300); // wait for animation
    }, 2000);
}

export function deletedMessage() {
    const toastContainer = document.querySelector('.toast-container');

    const toast = document.createElement('div');
    toast.classList.add('toast-delete');

    toast.innerHTML = `
        <img src="svg/delete.png" alt="Xmark icon">
        <p>Transaction Deleted</p>
    `;

    toastContainer.appendChild(toast);

    // show toast
    setTimeout(() => {
        toast.classList.add('js-deleted');
    }, 10);

    // auto hide
    setTimeout(() => {
        toast.classList.remove('js-deleted');

        setTimeout(() => {
            toast.remove();
        }, 300); // wait for animation
    }, 2000);
}

export function editedMessage() {
    const toastContainer = document.querySelector('.toast-container');

    const toast = document.createElement('div');
    toast.classList.add('toast-edit');

    toast.innerHTML = `
        <img src="svg/edit.svg" alt="Edit icon">
        <p>Transaction Edited</p>
    `;

    toastContainer.appendChild(toast);

    // show toast
    setTimeout(() => {
        toast.classList.add('js-edited');
    }, 10);

    // auto hide
    setTimeout(() => {
        toast.classList.remove('js-edited');

        setTimeout(() => {
            toast.remove();
        }, 300); // wait for animation
    }, 2000);
}