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
              backgroundImage: `url(${book.artwork})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf}
              onChange={(e) => moveBook(book, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currently-reading">Currently Reading</option>
              <option value="want-to-read">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

export default Book;
