// Get DOM elements
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const filter = document.getElementById('filter');
const totalRead = document.getElementById('total-read');

// Array to store books
let books = [];

// Add new book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    const book = {
        id: generateID(),
        title,
        author,
        status
    };

    books.push(book);
    displayBooks(books);
    updateTotalRead();

    // Clear input fields
    bookForm.reset();
});

// Generate random ID for books
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Display books in the main list, default to show only the first 6
function displayBooks(booksToShow, showAll = false) {
    // Clear the current book list
    bookList.innerHTML = '';

    // Determine how many books to display
    const booksToDisplay = showAll ? booksToShow : booksToShow.slice(0, 6);

    booksToDisplay.forEach(book => {
        const li = document.createElement('li');
        li.classList.add(book.status.replace(' ', '-'));
        li.innerHTML = `
            ${book.title} by ${book.author} 
            <span>(${book.status})</span>
            <button class="delete-btn" onclick="removeBook(${book.id})">x</button>
        `;
        bookList.appendChild(li);
    });
}

// Remove book from list
function removeBook(id) {
    books = books.filter(book => book.id !== id);
    displayBooks(books);
    updateTotalRead();
}

// Update the total number of books read
function updateTotalRead() {
    const total = books.filter(book => book.status === 'finished').length;
    totalRead.innerText = total;
}

// Filter books based on the selected status
filter.addEventListener('change', () => {
    const selectedStatus = filter.value;

    if (selectedStatus === 'all') {
        displayBooks(books, true); // Show all books when filtering "all"
    } else {
        const filteredBooks = books.filter(book => book.status === selectedStatus);
        displayBooks(filteredBooks, true); // Show all books in the filtered result
    }
});

// Initial display of only the first 6 books when the page loads
displayBooks(books);
