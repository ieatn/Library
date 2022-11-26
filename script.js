// classes
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
    // add book to array
    addBook(book) {
        this.books.push(book)
    }
    // test for book list
    displayBooks() {
        console.log(this.books)
    }
    // return new array of books after filtering out the one we want to remove
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }
}

// initialize UI 
const addBookBtn = document.getElementById('addBookBtn')
const removeBtn = document.getElementById('removeBtn')
const loginBtn = document.getElementById('loginBtn')
const grid = document.getElementById('grid')
let library = new Library()

// btn events
addBookBtn.onclick = () => getBook()

// functions

// get info from the form user after submitting
const getBook = (e) => {
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

// create the card containing book info
const createBookCard = (book) => {
    const bookCard = document.createElement('div')

    // adding onclick function to removeBtn sends itself to functions, this is only way to work from innerhtml
    bookCard.innerHTML = `
    <div class="col-4 p-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h3>
                <h5 class="card-title">${book.author}</h3>
                <h5 class="card-title">${book.pages}</h3>
                <!-- <textarea name="" id="" cols="30" rows="3">my notes</textarea> -->
                <button class="btn btn-success read" id="readBtn" onclick="toggleRead(this)">Read</button>
                <button class="btn btn-danger" id="removeBtn" onclick="removeBook(this)">Remove</button> 
            </div>
        </div>
    </div>
    `
    // wow this actually worked? add read class to readBtn, and onclick to this function
    // ternary operator turns on/off read class, if class is read, change text, vice versa
    // add/remove bootstrap colors to btn
    toggleRead = (e) => {
        e.classList.toggle('read')
        e.textContent = e.classList.contains('read') ? 'Read' : 'Not Read'
        if (e.classList.contains('read')) {
            e.classList.add('btn-success')
            e.classList.remove('btn-warning')
        } else {
            e.classList.add('btn-warning')
            e.classList.remove('btn-success')
        }
        book.isRead = !book.isRead
    }
    // grid is the bootstrap row. need to make this horizontal. 
    grid.appendChild(bookCard)
}

// get e, event propagation to go all the way up to card div instead of button and delete it
// omg i had to google firstElementChild finally works
removeBook = (e) => {
    const title = e.parentNode.firstElementChild.textContent
    library.removeBook(title)
    e.parentNode.parentNode.parentNode.remove()    
    saveLocal()
    displayBooks()
} 

// after submitting, clear the inputs
const clearFields = () => {
    document.getElementById('title').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('author').value = ''
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

// local storage

// save the library as JSON, call after getting book
const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

// get all books from local storage
// if there are saved books, pass all books to jsontobook() to convert all JSON books to book objects 
const restoreLocal = () => {
    const savedBooks = JSON.parse(localStorage.getItem('library'))
    if (savedBooks) {
        library.books = savedBooks.map((book) => JSONToBook(book))
    } else {
        library.books = []
    }
}
const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, book.isRead)
}

restoreLocal() 

window.onload = () => {displayBooks()}