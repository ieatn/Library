class Book {
    constructor(title, pages, author, isRead) {
        this.title = title
        this.pages = pages
        this.author = author
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }
    addBook(book) {
        this.books.push(book)
    }
    displayBooks() {
        console.log(this.books)
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
}

// UI
const addBookBtn = document.getElementById('addBookBtn')
const grid = document.getElementById('grid')
const modalBtn = document.getElementById('modalBtn')
const modalBg = document.querySelector('.modal-bg')
const modalClose = document.querySelector('#modalClose')
let library = new Library()

// MODAL
modalBtn.addEventListener('click', () => {
    modalBg.classList.add('active')
})
modalClose.addEventListener('click', () => {
    modalBg.classList.remove('active')
})

addBookBtn.onclick = () => getBook()

const getBook = () => {
    event.preventDefault()
    if (validateForm() === false) {
        return
    }
    else {
        const title = document.getElementById('title').value
        const pages = document.getElementById('pages').value
        const author = document.getElementById('author').value
        const isRead = document.getElementById('isRead').checked
        const book = new Book(title, pages, author, isRead)
        clearFields()
        library.addBook(book)
        createBookCard(book)
        saveLocal()
    }
}

const validateForm = () => {
    const titleInput = document.getElementById('title')
    const pagesInput = document.getElementById('pages')
    const authorInput = document.getElementById('author')
    
    if (titleInput.value.trim() === '') {
        alert('Please enter a title.')
        return false
    }

    if (authorInput.value.trim() === '') {
        alert('Please enter an author name.')
        return false
    }
    
    if (isNaN(pagesInput.value) || pagesInput.value < 1) {
        alert('Please enter a valid number of pages.')
        return false
    }

    return true
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    bookCard.innerHTML = `
    <div class="book">
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <div>
            <button class="btn ${book.isRead ? 'btn-green' : 'btn-yellow'}" ${book.isRead ? 'read' : ''}" id="readBtn" onclick="toggleRead(this)">${book.isRead ? 'Read' : 'Not Read'}</button>
            <button class="btn btn-red" id="removeBtn" onclick="removeBook(this)">Remove</button>
        </div>
    </div>
    `
    toggleRead = (e) => {
        e.classList.toggle('read')
        e.textContent = e.classList.contains('read') ? 'Read' : 'Not Read'
        if (e.classList.contains('read')) {
            e.classList.add('btn-green')
            e.classList.remove('btn-yellow')
        } else {
            e.classList.add('btn-yellow')
            e.classList.remove('btn-green')
        }
        book.isRead = !book.isRead
    }
    grid.appendChild(bookCard)
}

removeBook = (e) => {
    const bookTitle = e.parentNode.parentNode.querySelector('p:first-child').textContent
    library.removeBook(bookTitle)
    e.parentNode.parentNode.remove()
    saveLocal()
}

const clearFields = () => {
    document.getElementById('title').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isRead').checked = false
}

const displayBooks = () => {
    clear()
    for (let book of library.books) {
        createBookCard(book)
    }
}

const clear = () => {
    grid.innerHTML = ''
}

const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, book.isRead)
}

const restoreLocal = () => {
    const savedBooks = JSON.parse(localStorage.getItem('library'))
    if (savedBooks) {
        library.books = savedBooks.map((book) => JSONToBook(book))
    } else {
        library.books = []
    }
}

restoreLocal() 

window.onload = () => {displayBooks()}