let books = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBook(title, author, pages, haveRead) {
    const bookToAdd = new Book(title, author, pages, haveRead);
    bookToAdd.arrayIndex = books.push(bookToAdd) - 1;
}

Book.prototype.remove = function () {
    const index = this.arrayIndex;
    removeBookFromPage(index);
    books.splice(index, 1);
    shiftDataIndexes(index);
    shiftArrayIndexes(index);
}

Book.prototype.toggleRead = function () {
    if(this.haveRead === true) {
        this.haveRead = false;
    } else {
        this.haveRead = true;
    }
}

function shiftDataIndexes(removedIndex) {
        const allBooks = document.querySelectorAll("[data-arrayIndex]");
        allBooks.forEach(book => {
            if(book.getAttribute("data-arrayIndex") > removedIndex) {
                const currentIndex = book.getAttribute("data-arrayIndex");
                book.setAttribute("data-arrayIndex", currentIndex - 1);
            }
        });
}

function shiftArrayIndexes(removedIndex) {
    books.forEach(book => {
        if(book.arrayIndex > removedIndex) {
            book.arrayIndex--;
        }
    });
}

function clearPageFromBooks() {
    const container = document.querySelector(".books");
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function addBooksToPage() {
    clearPageFromBooks();
    for (let i = 0; i < books.length; i++) {
        let newBook = document.createElement("div");
        newBook.classList.add("book");

        let bookTitle = document.createElement("h1");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = books[i].title;
        newBook.appendChild(bookTitle);

        let bookAuthor = document.createElement("h3");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = `${books[i].author}`;
        newBook.appendChild(bookAuthor);

        let bookPages = document.createElement("p");
        bookPages.classList.add("book-pages");
        bookPages.textContent = `Pages: ${books[i].pages}`;
        newBook.appendChild(bookPages);

        let haveRead = document.createElement("p");
        haveRead.classList.add("book-haveread");
        haveRead.textContent = `Have read: `;
        
        let readInput = document.createElement("input");
        readInput.setAttribute("type", "checkbox");
        readInput.setAttribute("onchange", "handleReadToggle(this);")
        if(books[i].haveRead) {
            readInput.checked = true;
        } else {
            readInput.checked = false;
        }
        readInput.classList.add("book-is-read");
        haveRead.append(readInput);
        newBook.appendChild(haveRead);
        newBook.setAttribute("data-arrayIndex", `${books[i].arrayIndex}`);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from library";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            const parentIndex = removeButton.parentElement.getAttribute("data-arrayIndex");
            books[parentIndex].remove();
        });
        newBook.append(removeButton);

        const elementToAppendTo = document.querySelector(".books");
        elementToAppendTo.appendChild(newBook);
    }
}

function removeBookFromPage(index) {
    const pageBooks = [...document.querySelectorAll(".book")];
    pageBooks.forEach(book => {
        if (book.getAttribute("data-arrayIndex") == index) {
            book.remove();
        }
    });
}

function findBookOnPage(index) {
    const pageBooks = [...document.querySelectorAll(".book")];
    pageBooks.forEach(book => {
        if(book.getAttribute("data-arrayIndex") == index) {
            return book;
        }
    });
}

function handleReadToggle(element) {
    const book = element.parentElement.parentElement;
    const arrayIndex = book.getAttribute("data-arrayIndex");
    books[arrayIndex].toggleRead();
}

const modal = document.querySelector(".modal");
const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", () => {
    modal.style.display = "block";
});

const modalCloseButton = document.querySelector(".close");
modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

const submitBookButton = document.querySelector(".submit-button");
submitBookButton.addEventListener("click", () => {
    let formTitle = document.querySelector(".title-input").value
    const title = formTitle;
    let formAuthor = document.querySelector(".author-input").value
    const author = formAuthor;
    let formPages = document.querySelector(".pages-input").value
    const pages = formPages
    let formHaveRead = document.querySelector(".haveread-input").checked;
    const haveRead = formHaveRead;
    if(title !== "" && author !== "" && pages > 0) {
        addBook(title, author, pages, haveRead);
        addBooksToPage();
        modal.style.display = "none";
    } else {
        alert("Please fill out the form fully.");
    }
});



addBook("Example Book", "Fredrik B", 1, true);
addBooksToPage();






