let myLibrary = [];

/* Book constructor */

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

/* function that pushes book to myLibrary */
function addBookToLibrary(book) {
    myLibrary.push(book);
}


/* Demo books that get pushed to myLibrary */
let howTo = new Book('How to cook', 'Denny Crane', 250, 'Completed');
let goTo = new Book('How to fly', 'Jerry Espenson', 250, 'Completed');
let nowTo = new Book('How to fish', 'Daniel Shaw', 250, 'Completed');
let thatTo = new Book('How to sing', 'Cody Gaines', 250, 'Completed');
addBookToLibrary(howTo);
addBookToLibrary(goTo);
addBookToLibrary(nowTo);
addBookToLibrary(thatTo);

/* Dom selector for .books */
let books = document.querySelector('.books');

/* make the demo display as card on the page */
displayOnPage();

/* function that runs through library array and appends its items to books */
function displayOnPage () {
    for (let i = 0 ;i < myLibrary.length; i++) {
        let content = document.createElement('div');
        content.className= 'content';
        let title = document.createElement('h2');
        let author = document.createElement('h5');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        let deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        let readButton = document.createElement('button');
        readButton.className = 'readButton';


        title.textContent = `${myLibrary[i].title}`;
        author.textContent = `by ${myLibrary[i].author}`;
        pages.textContent = `${myLibrary[i].pages} pages`;
        read.textContent = `Status: ${myLibrary[i].read}`;
        deleteButton.textContent = 'Delete';
        readButton.textContent = 'Read Status';

        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(pages);
        content.appendChild(read);
        content.appendChild(readButton);
        content.appendChild(deleteButton);

        books.appendChild(content);

    }

    /* when detete button is clicked, remove the parent node */
    let delbuttons = document.querySelectorAll('button.deleteButton');
    delbuttons.forEach((item, index) => {
        item.addEventListener('click', (el) => {
            el.currentTarget.parentNode.remove();
            myLibrary.splice(index, 1);
            while (books.lastChild) { // remove all book children in book
                books.removeChild(books.lastChild);
            }
            displayOnPage();
            
        })
    })

    /* when read status button is clicked change status of the book */
    let readbuttons = document.querySelectorAll('button.readButton');
    readbuttons.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (myLibrary[index].read == 'In Progress') {
                myLibrary[index].read = 'Completed';
            } else {
                myLibrary[index].read = 'In Progress';
            }

            while (books.lastChild) {
                books.removeChild(books.lastChild);
            }
            displayOnPage();
        })
        
    })

    
}

/* dom selector for the form button */
let openForm = document.querySelector('.openForm');
openForm.addEventListener('click', function () {
    document.querySelector(".formPop").style.display = "block";
    let update = document.querySelector('.update');
    let cancel = document.querySelector('.cancel');

    /* hide the form when cancel button is clicked */
    cancel.addEventListener('click', () => {
        document.querySelector(".formPop").style.display = "none";
    });

    /* take values from the form and push to library and dom */
    update.addEventListener('click', function () {
        let inputTitle = document.querySelector('#title').value;
        let inputAuthor = document.querySelector('#author').value;
        let inputPages = document.querySelector('#pages').value;
        let inputRead = document.querySelector("input[name='read']:checked").value;
        if (inputTitle == '') {
            alert ('Please enter Book Title');
            return false;
        }
        if (inputRead == 'Yes') {
            inputRead = 'Completed';
        } else {
            inputRead = 'In Progress';
        }
        
        let liveBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
        addBookToLibrary(liveBook);

        while (books.lastChild) {
            books.removeChild(books.lastChild);
        }
        displayOnPage();
    });
});

