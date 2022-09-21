import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Shelves from "./Shelves";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as API from "../BooksAPI";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import Shelves from "./Shelves";
// import Book from "./Book";
// import * as API from "../BooksAPI";

const Search = () => {
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
      {/* Search */}
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFromSearch.map((b) => (
              <li>
                <Book book={b} moveBook={moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* End search */}
    </div>
  );
};

export default Search;

// Initial search
// const Search = ({
//     Book,
//     searchQuery,
//     setSearchQuery,
//     booksFromSearch,
//   moveBook,
//   mappedBookIds,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const [searchResults, setSearchResults] = useState([]);

//   const [booksFromSearch, setBooksFromSearch] = useState([]);

//   useEffect(() => {
//     let isActive = true;
//     if (searchQuery) {
//       API.search(searchQuery).then((data) => {
//         if (data.error) {
//           console.log("Search error");
//         } else {
//           if (isActive) {
//             setSearchResults(data);
//           }
//         }
//       });
//     }

//     return () => {
//       isActive = false;
//       setSearchResults([]);
//     };
//   }, [searchQuery]);

//   useEffect(() => {
//     const booksReturnedFromSearch = searchResults.map((result) => {
//       if (mappedBookIds.has(result.id)) {
//         return mappedBookIds.get(result.id);
//       } else {
//         return result;
//       }
//     });
//     setBooksFromSearch(booksReturnedFromSearch);
//   }, [searchResults]);

//   return (
//     <div className="search-books">
//       <div className="search-books-bar">
//         <Link className="close-search" to="/">
//           Close
//         </Link>
//         <div className="search-books-input-wrapper">
//           <input
//             type="text"
//             placeholder="Search by title, author, or ISBN"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="search-books-results">
//         <ol className="books-grid">
//           {booksFromSearch?.map((b) => (
//             <li>
//               <Book book={b} moveBook={moveBook} />
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// };
// export default Search;
