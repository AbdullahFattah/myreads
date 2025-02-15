import Book from "./Book";
const BookShelf = ({ books, title, moveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((b) => (
            <li>
              <Book book={b} moveBook={moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
