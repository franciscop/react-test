import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  return (
    <form onChange={(e) => setQuery((e.target as HTMLInputElement).value)}>
      <input name="query" />
      <p>{query}</p>
    </form>
  );
}
