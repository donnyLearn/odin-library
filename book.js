let myLibrary = [];

function Book(title, author, pages, haveRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.haveRead = haveRead;
	this.readStatus = haveRead ? "Read" : "Not Read";
}
Book.prototype.info = function() {
	infoString = this.title + " by " + this.author + ", " + this.pages + " pages, " + this.	readStatus;
	return infoString;
}

function toggleRead(e) {
	var target = e.target.parentNode.querySelector('.bookStatus');
	if(target.textContent == "Read") {
		target.innerHTML = "Not Read";
	} else {
		target.innerHTML = "Read";
	}
}

function removeBook(e) {
	var target = e.target.parentNode;
	var targetTitle = target.querySelector('.bookTitle').textContent;
	var targetAuthor = target.querySelector('.bookAuthor').textContent;
	var targetPages = target.querySelector('.bookPages').textContent

	myLibrary = myLibrary.filter((book) => (book.title != targetTitle || book.author != targetAuthor || book.pages != targetPages));
	showLibrary();
}

function showLibrary() {
	var container = document.getElementById("container");
	
	while(container.firstChild) {
		container.removeChild(container.firstChild);
	}
	for (var i = 0; i < myLibrary.length; i++) {
		var card = document.querySelector("div[class='card template']").cloneNode(true);
		card.classList.remove('template')

		card.querySelector("img").src = "./resources/book2.jpg";
		card.querySelector(".bookTitle").textContent = myLibrary[i].title
		card.querySelector(".bookAuthor").textContent = myLibrary[i].author
		card.querySelector(".bookPages").textContent = myLibrary[i].pages
		card.querySelector(".bookStatus").textContent = myLibrary[i].readStatus
		card.querySelector(".bookStatus").onclick = toggleRead;
		card.querySelector(".bookRemove").onclick = removeBook;

		container.appendChild(card)
	}
}

function validateForm(formTitle, formAuthor, formPages) {
	var titleError = document.getElementById("titleError")
	titleError.innerHTML = ""
	var authorError = document.getElementById("authorError")
	authorError.innerHTML = ""
	var pagesError = document.getElementById("pagesError")
	pagesError.innerHTML = ""
	// var existError = document.getElementById("existError")
	existError.innerHTML = ""

	if(formTitle == "") {
		titleError.innerHTML = "Please fill the title"
		return false
	}
	if(formTitle.length > 50) {
		titleError.innerHTML = "Title is too long"
		return false
	}
	if(formAuthor == "") {
		authorError.innerHTML = "Please fill the author's name"
		return false
	}
	if(formAuthor.length > 30) {
		authorError.innerHTML = "Author's name is too long"
		return false
	}

	if(formPages == "") {
		pagesError.innerHTML = "Please fill pages count"
		return false
	}
	if(formPages.length < 5) {
		for (var i = 0; i < formPages.length; i++) {
			if(isNaN(parseInt(formPages[i]))) {
				pagesError.innerHTML = "Please fill a valid pages count"
				return false
			}
		}
		if(parseInt(formPages) == 0) {
			pagesError.innerHTML = "Please fill a valid pages count"
			return false
		}
	} else {
		pagesError.innerHTML = "Please fill a valid pages count"
		return false
	}
	return true
}

function addBookToLibrary() {
	var form = document.getElementById("insertBookForm");
	var formTitle = form.elements[0].value;
	var formAuthor = form.elements[1].value;
	var formPages = form.elements[2].value;
	var formRead = form.elements[3].checked;
	var existFlag = false;

	if(validateForm(formTitle, formAuthor, formPages)) {
		var book = new Book(formTitle, formAuthor, formPages, formRead)
		for (var i = 0; i < myLibrary.length; i++) {
			if((myLibrary[i].title == book.title) && (myLibrary[i].author == book.author) && (myLibrary[i].pages == book.pages)) {
				existError.innerHTML = "Book already in the library"
				existFlag = true;
			}
		}
		if(!existFlag) {
			myLibrary.push(book)
			showLibrary();
			closeForm();
		}
	}
}

function openForm() {
	var form = document.getElementById("insertBookForm");
	form.style.display = "block";
	form.reset();
	form.parentElement.classList.add("disabledBg");
}
function closeForm() {
	var form = document.getElementById("insertBookForm");
	form.style.display = "none";
	form.parentElement.classList.remove("disabledBg");
}