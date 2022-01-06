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

addBook("The Hobbit", "J.R.R Tolkien", 295, true);
addBook("Eragon", "Cristopher Paolini", 544, true);
addBook("The Return of the King", "J.R.R Tolkien", 416, false);
console.dir(books);

for(let i = 0; i < books.length; i++) {
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
    if(books[i].haveRead === true) {
        haveRead.textContent = `Have read`;
    } else {
        haveRead.textContent = `Have not read yet`;
    }
    newBook.appendChild(haveRead);
    
    const elementToAppendTo = document.querySelector(".books");
    newBook.append(document.createElement("h1").textContent=newBook.title);
    elementToAppendTo.appendChild(newBook);
}
