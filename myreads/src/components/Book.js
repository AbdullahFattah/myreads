const Book = ({ book, moveBook }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : null
              })`,
            }}
          ></div>
          <div
            className={
              book.shelf === "currentlyReading"
                ? "book-shelf-changer-cr"
                : book.shelf === "wantToRead"
                ? "book-shelf-changer-wtr"
                : book.shelf === "read"
                ? "book-shelf-changer-r"
                : "book-shelf-changer-none"
            }
          >
            <select
              defaultValue={book.shelf ? book.shelf : "none"}
              onChange={(e) => moveBook(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

export default Book;
