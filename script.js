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
}
// initialize UI 
const addBookBtn = document.getElementById('addBookBtn')
const removeBtn = document.getElementById('removeBtn')
const grid = document.getElementById('grid')
let L = new Library()

// btn events
addBookBtn.onclick = () => getBook()
// removeBtn.onclick = () => removeBook()
// functions
const getBook = (e) => {
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const author = document.getElementById('author').value
    const isRead = document.getElementById('isRead').checked
    const book = new Book(title, pages, author, isRead)
    L.addBook(book)
    L.displayBooks()
    createBookCard()
}
const removeBook = () => {
    console.log('removed')
}
const createBookCard = () => {
    const bookCard = document.createElement('div')
    bookCard.innerHTML = `
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Title</h3>
                <h5 class="card-title">Author</h3>
                <h5 class="card-title">Pages</h3>
                <!-- <textarea name="" id="" cols="30" rows="3">my notes</textarea> -->
                <button class="btn btn-success">Read</button>
                <button class="btn btn-warning">Not Read</button>
                <button class="btn btn-danger" id="removeBtn">Remove</button>
            </div>
        </div>
    </div>
    `
    grid.appendChild(bookCard)
}