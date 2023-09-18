window.addEventListener('DOMContentLoaded', async () => {
    const peopleTableBody = document.querySelector('#peopleTableBody');
    const addPersonForm = document.querySelector('#addPersonForm');
    const editPersonForm = document.querySelector('#editPersonForm');

    const fetchPeople = async () => {
        const result = await fetch('/api/People');
        return await result.json();
    }

    const handleAddPersonSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(addPersonForm);
        try {
            const result = await fetch('/api/People', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                    email: formData.get('email'),
                phone: formData.get('phone'),
                    address: formData.get('address')
                })
            });
                        if (!result.ok) {
                throw new Error('Wystąpił błąd podczas dodawania osoby.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            addPersonForm.reset();
            await renderTable();
        }
    }
    addPersonForm.addEventListener('submit', handleAddPersonSubmit);

    const handleEditPerson = async id => {
        try {
            const person = await (await fetch(`/api/People/${id}`)).json();
             document.querySelector('#editPersonId').value = person.id;
             document.querySelector('#editPersonFirstName').value = person.firstName;
             document.querySelector('#editPersonLastName').value = person.lastName;
             document.querySelector('#editPersonEmail').value = person.email;
             document.querySelector('#editPersonPhone').value = person.phone;
             document.querySelector('#editPersonAddress').value = person.address;
        } catch ({ message }) {
            alert(message);
        }
    }

    const handleEditPersonSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(editPersonForm);
        try {
            const result = await fetch(`/api/People/${formData.get('id')}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                     id: parseInt(formData.get('id')),
                     firstName: formData.get('firstName'),
                     lastName: formData.get('lastName'),
                     email: formData.get('email'),
                     phone: formData.get('phone'),
                     address: formData.get('address')
                })
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas dodawania osoby.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            await renderTable();
        }
    }
    editPersonForm.addEventListener('submit', handleEditPersonSubmit);

    const handleDeletePerson = async id => {
        try {
            const result = await fetch(`/api/People/${id}`, {
                method: 'DELETE'
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas usuwania osoby.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            await renderTable();
        }
    }

    const registerEvents = () => {
        document.querySelectorAll('[data-edit-person-id]')
            .forEach(editButton => editButton.addEventListener('click', () => handleEditPerson(editButton.dataset.editPersonId)));

        document.querySelectorAll('[data-delete-person-id]')
            .forEach(deleteButton => deleteButton.addEventListener('click', () => handleDeletePerson(deleteButton.dataset.deletePersonId)));
    }

    const tableRow = ({ id, firstName, lastName , email, phone, address}) => `
        <tr>
            <th scope="row">${id}</th>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${address}</td>
            <td>
                <button data-bs-toggle="modal" data-bs-target="#editPersonModal" data-edit-person-id="${id}" type="button" class="btn btn-primary">Edytuj</button>
                <button data-delete-person-id="${id}" type="button" class="btn btn-danger">Usuń</button>
            </td>
        </tr>
    `;

    const renderTable = async () => {
        peopleTableBody.innerHTML = '';
        const people = await fetchPeople();
        people.map(person => peopleTableBody.innerHTML += tableRow({ ...person }));
        registerEvents();
    }

    await renderTable();
})