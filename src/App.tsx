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
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    setIsFetching(true);
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
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(true);
      });
  };

  if (isFetching)
    return (
      <section className="flex items-center justify-center border h-[100vh] ">
        <h1 className="text-xl">Loading quote...</h1>
      </section>
    );

  const { author, authorSlug, content, dateAdded, dateModified, tags } =
    quoteData;
  return (
    <section className="flex flex-col items-center justify-center p-3 h-[100vh]">
      {/* <h1 className="text-foreground">Random quotes</h1> */}
      <article className="flex flex-col items-center justify-center gap-2">
        <blockquote className="text-2xl text-center">"{content}"</blockquote>
        <aside>
          <p className="text-sm">
            - {author}
            <span className="text-xs"> ({authorSlug})</span>
          </p>
        </aside>
        <div
          className="flex flex-wrap items-center justify-center mt-3"
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {tags.map((tag) => (
            <div className="text-sm border border-gray-300 p-1 rounded">
              #{tag}
            </div>
          ))}
        </div>

        <header className="mt-5 flex gap-2 flex-wrap">
          <p className="text-xs">Added on {dateAdded}</p>
          <p className="text-xs">Modified {dateModified}</p>
        </header>
      </article>

      <Button className="mt-3" onClick={handleFetch}>
        Get a new quote
      </Button>
    </section>
  );
}

export default App;
