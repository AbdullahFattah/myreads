import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Shelves from "./Shelves";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as API from "../BooksAPI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [booksFromSearch, setBooksFromSearch] = useState([]);

  const [mappedBookIds, setMappedBookIds] = useState(new Map());

  useEffect(() => {
    API.getAll().then((data) => {
      setBooks(data);
      setMappedBookIds(mappedBooks(data));
    });
  }, []);

  useEffect(() => {
    let isActive = true;
    if (searchQuery) {
      API.search(searchQuery).then((data) => {
        if (data.error) {
          console.log("Search error");
        } else {
          if (isActive) {
            setSearchResults(data);
          }
        }
      });
    }

    return () => {
      isActive = false;
      setSearchResults([]);
    };
  }, [searchQuery]);

  useEffect(() => {
    const booksReturnedFromSearch = searchResults.map((result) => {
      if (mappedBookIds.has(result.id)) {
        return mappedBookIds.get(result.id);
      } else {
        return result;
      }
    });
    setBooksFromSearch(booksReturnedFromSearch);
  }, [searchResults]);

  const mappedBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

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
      <div className="list-books">
        <Navbar />
        <div className="list-books-content">
          <Shelves books={books} moveBook={moveBook} />
        </div>
        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}
export default BookList;
