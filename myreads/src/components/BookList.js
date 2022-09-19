import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Shelves from "./Shelves";
import * as API from "../BooksAPI";

function BookList() {
  useEffect(() => {
    API.getAll().then((data) => setBooks(data));
  }, []);

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);

  const moveBook = (book, targetShelf) => {
    const returnedBook = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = targetShelf;
        return book;
      }
      return b;
    });
    setBooks(returnedBook);

    API.update(book, targetShelf);
  };
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Navbar />
          <div className="list-books-content">
            <Shelves books={books} moveBook={moveBook} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookList;
