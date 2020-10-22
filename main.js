//es6
class Book {
constructor(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
}

class UI {
  addBookToList(book){
// console.log(book);
const list = document.getElementById('book-list');
//create tr ele
const row = document.createElement('tr');
//insert cols
row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</td>`

list.appendChild(row);
  }

  showAlert(message, className){
//create div
const div = document.createElement('div');
//add class
div.className = `alert ${className}`;
//add text
div.appendChild(document.createTextNode(message));
//get parent
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
//insert alert;
container.insertBefore(div, form);
//disapper alert
setTimeout(function(){
  document.querySelector('.alert').remove();
}, 2000);
  }

  deleteBook(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}
//local storage clss
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      //add book to ui
      ui.addBookToList(book);
    })
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    // console.log(isbn);
    books.forEach(function(book, index){
      if(book.isbn===isbn){
        books.splice(index, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books));

  }
}
//dom load event
document.addEventListener('DOMContentLoaded',
Store.displayBooks)

document.getElementById('book-form').addEventListener('submit', function(e){
  // console.log('test');
  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
// console.log(book);

//instantiate ui
const ui = new UI();
//validate
if(title === '' || author === '' || isbn === ''){
//error alert
ui.showAlert('pls fil all','error')
}else{
//add book to list
ui.addBookToList(book);
//add to localstorage
Store.addBook(book);

//succes mesg
ui.showAlert('book added!','success');
//clear fields
ui.clearFields();
}


// console.log(title,author,isbn);
  e.preventDefault();

});
//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  //delete book
  ui.deleteBook(e.target);

  //remve book for localsta
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('book deleted', 'error');
  e.preventDefault();
})