import BookShelf from "./BookShelf";
const Shelves = ({ books }) => {
  const currentlyReading = books.filter((b) => b.shelf === "currently-reading");
  const wantToRead = books.filter((b) => b.shelf === "want-to-read");
  const read = books.filter((b) => b.shelf === "read");

  return (
    <div>
      <BookShelf title="Currently Reading" books={currentlyReading} />
      <BookShelf title="Want To Read" books={wantToRead} />
      <BookShelf title="Read" books={read} />
    </div>
  );
};

export default Shelves;
