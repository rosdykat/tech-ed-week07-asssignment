// We will render the database data sent by the users here

export default function Content() {
  // store data in state
  // fetch the values from the server --> this is an effect (useEffect)
  // Once you fetched the data, parse it to JSON --> console log it for testing/debugging
  // update state with the fetched data (you might have to wrangle it)

  // poll your database to keep your data updated ---> this is an effect (with setInterval maybe?)
  return (
    <>
      <h1>My Content</h1>
      {/* rendered list of content (remember the key) */}
      {/* If you are feeling extra: why not conditionally render some of the items in your list? */}
    </>
  );
}
