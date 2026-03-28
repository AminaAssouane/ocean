import { useState } from "react";

export default function Users() {
  const [query, setQuery] = useState("");

  function handleSearch() {}

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} />
      <button>Search</button>
    </div>
  );
}
