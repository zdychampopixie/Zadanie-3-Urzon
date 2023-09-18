window.addEventListener('DOMContentLoaded', async () => {
    const booksTableBody = document.querySelector('#booksTableBody');
    const addBookForm = document.querySelector('#addBookForm');
    const editBookForm = document.querySelector('#editBookForm');

    const fetchBooks = async () => {
        const result = await fetch('/api/Books');
        return await result.json();
    }

    const handleAddBookSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(addBookForm);
        try {
            const result = await fetch('/api/Books', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    title: formData.get('title'),
                    author: formData.get('author'),
                    genre: formData.get('genre'),
                    isbn: formData.get('isbn')
                })
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas dodawania osoby.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            addBookForm.reset();
            await renderTable();
        }
    }
    addBookForm.addEventListener('submit', handleAddBookSubmit);

    const handleEditBook = async id => {
        try {
            const book = await (await fetch(`/api/Books/${id}`)).json();
            document.querySelector('#editBookId').value = book.id;
            document.querySelector('#editBookTitle').value = book.title;
            document.querySelector('#editBookAuthor').value = book.author;
            document.querySelector('#editBookGenre').value = book.genre;
            document.querySelector('#editBookIsbn').value = book.isbn;
        } catch ({ message }) {
            alert(message);
        }
    }

    const handleEditBookSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(editBookForm);
        try {
            const result = await fetch(`/api/Books/${formData.get('id')}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: parseInt(formData.get('id')),
                    title: formData.get('title'),
                    author: formData.get('author'),
                    genre: formData.get('genre'),
                    isbn: formData.get('isbn')
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
    editBookForm.addEventListener('submit', handleEditBookSubmit);

    const handleDeleteBook = async id => {
        try {
            const result = await fetch(`/api/Books/${id}`, {
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
        document.querySelectorAll('[data-edit-book-id]')
            .forEach(editButton => editButton.addEventListener('click', () => handleEditBook(editButton.dataset.editBookId)));

        document.querySelectorAll('[data-delete-book-id]')
            .forEach(deleteButton => deleteButton.addEventListener('click', () => handleDeleteBook(deleteButton.dataset.deleteBookId)));
    }

    const tableRow = ({ id, title, author, genre, isbn }) => `
        <tr>
            <th scope="row">${id}</th>
            <td>${title}</td>
            <td>${author}</td>
            <td>${genre}</td>
            <td>${isbn}</td>
            <td>
                <button data-bs-toggle="modal" data-bs-target="#editBookModal" data-edit-book-id="${id}" type="button" class="btn btn-primary">Edytuj</button>
                <button data-delete-book-id="${id}" type="button" class="btn btn-danger">Usuń</button>
            </td>
        </tr>
    `;

    const renderTable = async () => {
        booksTableBody.innerHTML = '';
        const books = await fetchBooks();
        books.map(book => booksTableBody.innerHTML += tableRow({ ...book }));
        registerEvents();
    }

    await renderTable();
})