import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const collection = inputValue.replace("https://www.siepomaga.pl/", "");
    router.push(`/${collection}`);
  };

  return (
    <form onSubmit={onSubmit}>
      Wklej link lub napisz nazwe zbiórki:
      <br />
      <input onChange={(e) => setInputValue(e.target.value)} />
      <button type="submit">Dalej</button>
    </form>
  );
}
