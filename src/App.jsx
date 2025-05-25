import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [color, setColor] = useState({ r: 50, g: 50, b: 50 });
  const [quotes, setQuotes] = useState([]);
  const [currQuote, setcurrQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(null);
  const [wpLink, setwpLink] = useState(null);
  const [error, setError] = useState(null);

  const getRandomColor = () => {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
  };

  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setcurrQuote(randomQuote);
    setColor(getRandomColor());
    setLink(
      `https://x.com/intent/tweet?text="${randomQuote.content}"%20${randomQuote.author}&hashtags=quotes`
    );
    setwpLink(
      `https://wa.me/?text="${randomQuote.content}"%20${randomQuote.author}`
    );
  };

  const getQuotes = async () => {
    try {
      const response = await fetch(
        "https://api.quotable.io/quotes/random?limit=20"
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();
      setQuotes(result);
      console.log(result);
      const randomQuote = result[Math.floor(Math.random() * result.length)];
      setcurrQuote(randomQuote);
      setColor(getRandomColor());
      setLink(
        `https://x.com/intent/tweet?text="${randomQuote.content}"%20${randomQuote.author}&hashtags=quotes`
      );
      setwpLink(
        `https://wa.me/?text="${randomQuote.content}"%20${randomQuote.author}`
      );
    } catch (error) {
      console.error("Failed to fetch quotes: ", error);
      setError("Server is unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      <div
        className="w-screen h-screen flex justify-center items-center transition
        duration-1000"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
      >
        <div
          id="quote-box"
          className="w-full max-w-[550px] bg-white rounded-sm p-9 transition-all duration-1000 shadow-md m-3"
        >
          <AnimatePresence mode="wait">
            {!loading && currQuote && (
              <motion.div
                key={currQuote.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="transition-all duration-1000"
              >
                <div
                  id="text"
                  style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="text-3xl transition duration-1000 text-center justify-center"
                >
                  <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" />
                  <span className="playfair-display-content">{currQuote.content}</span>
                </div>
                <div
                  id="author"
                  style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="transition duration-1000 text-right text-lg mt-4"
                >
                  <span className="playfair-display-content">-- {currQuote.author}</span>
                </div>
              </motion.div>
            )}
            {error && (
              <div className="text-red-600 text-center mb-4 font-semibold text-3xl">
                {error}
              </div>
            )}
          </AnimatePresence>
          <div id="button-div" className="flex justify-between mt-8">
            <div id="message-buttons" className="flex gap-2">
              <a href={link || ""} target="_blank" rel="noopener noreferrer">
                <button
                  id="tweet-quote"
                  style={{
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  }}
                  className="text-white p-2 rounded-sm cursor-pointer transition duration-1000"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/yizwahhw.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                  ></lord-icon>
                </button>
              </a>
              <a href={wpLink || ""} target="_blank" rel="noopener noreferrer">
                <button
                  id="wp-quote"
                  style={{
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  }}
                  className="text-white p-2 rounded-sm cursor-pointer transition duration-1000"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/dnphlhar.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                  ></lord-icon>
                </button>
              </a>
            </div>
            <button
              id="new-quote"
              onClick={getRandomQuote}
              style={{
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              }}
              className="text-white p-2 rounded-sm cursor-pointer transition duration-1000 montserrat-content"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
