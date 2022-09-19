import BookShelf from "./BookShelf";
const Shelves = ({ books, moveBook }) => {
  const currentlyReading = books.filter((b) => b.shelf === "currentlyReading");
  const wantToRead = books.filter((b) => b.shelf === "wantToRead");
  const read = books.filter((b) => b.shelf === "read");

  return (
    <div>
      <BookShelf
        title="Currently Reading"
        books={currentlyReading}
        moveBook={moveBook}
      />
      <BookShelf title="Want To Read" books={wantToRead} moveBook={moveBook} />
      <BookShelf title="Read" books={read} moveBook={moveBook} />
    </div>
  );
};

export default Shelves;
