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
// initialize UI 
const addBookBtn = document.getElementById('addBookBtn')
const removeBtn = document.getElementById('removeBtn')
const grid = document.getElementById('grid')
let library = new Library()

// btn events
addBookBtn.onclick = () => getBook()

// functions
const getBook = (e) => {
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const author = document.getElementById('author').value
    const isRead = document.getElementById('isRead').checked
    const book = new Book(title, pages, author, isRead)
    library.addBook(book)
    createBookCard(book)
}
// onclick function on removeBtn allows js to be used in html, call remove() with this keyword
const createBookCard = (book) => {
    const bookCard = document.createElement('div')

    bookCard.innerHTML = `
    <div class="col-4">
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
    }
    grid.appendChild(bookCard)
}

// get e, event propagation to go all the way up to card div instead of button and delete it
// omg i had to google firstElementChild finally works
removeBook = (e) => {
    const title = e.parentNode.firstElementChild.textContent
    library.removeBook(title)
    e.parentNode.parentNode.parentNode.remove()    
} 