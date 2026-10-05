import { useState, type FormEvent } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    setQuery(String(new FormData(e.currentTarget).get("query")));
  };
  return (
    <form onChange={onChange}>
      <input name="query" />
      <p>{query}</p>
    </form>
  );
}
