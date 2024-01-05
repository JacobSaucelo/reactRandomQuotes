import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

const baseLink = "https://api.quotable.io/quotes/random";

interface QuoteDataType {
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
  _id: string;
}

function App() {
  const [quoteData, setQuoteData] = useState<QuoteDataType>({
    author: "",
    authorSlug: "",
    content: "",
    dateAdded: "",
    dateModified: "",
    length: 0,
    tags: [],
    _id: "",
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetch(baseLink, { method: "GET" })
      .then((res) => res.json())
      .then((data: QuoteDataType[]) => {
        setQuoteData({
          author: data[0].author,
          authorSlug: data[0].authorSlug,
          content: data[0].content,
          dateAdded: data[0].dateAdded,
          dateModified: data[0].dateModified,
          length: data[0].length,
          tags: data[0].tags,
          _id: data[0]._id,
        });
      })
      .catch((err) => console.log(err));
  };

  console.log("quoteData: ", quoteData);

  const {
    author,
    authorSlug,
    content,
    dateAdded,
    dateModified,
    length,
    tags,
    _id,
  } = quoteData;
  return (
    <>
      <h1>Random quotes</h1>
      <Button onClick={handleFetch}>get a new quote</Button>
      <section>
        <h1 className="text-3xl">{content}</h1>
        <h5>{author}</h5>
        <h5>{authorSlug}</h5>
        <header>
          <p>{dateAdded}</p>
          <p>{dateModified}</p>
          <p>
            {tags.map((tag) => (
              <div>#{tag}</div>
            ))}
          </p>
        </header>
      </section>
    </>
  );
}

export default App;
