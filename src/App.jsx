import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import History from "./components/History";
import { searchContext } from "./context/contexts";
import { v4 as uuidv4 } from "uuid";
import Copy from "./components/Copy";
import { ToastContainer } from "react-toastify";

function App() {
  const [color, setColor] = useState({ r: 50, g: 50, b: 50 });
  const [quotes, setQuotes] = useState([]);
  const [currQuote, setcurrQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [xLink, setxLink] = useState(null);
  const [wpLink, setwpLink] = useState(null);
  const [error, setError] = useState(null);

  const getRandomColor = () => {
    return {
      r: Math.floor(Math.random() * 128),
      g: Math.floor(Math.random() * 128),
      b: Math.floor(Math.random() * 128),
    };
  };

  const getRandomQuote = () => {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    while (randomQuote.length > 330) {
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setcurrQuote(randomQuote);
    setColor(getRandomColor());
    setxLink(
      `https://x.com/intent/tweet?text="${randomQuote.quote}"%20${randomQuote.author}&hashtags=quotes`
    );
    setwpLink(
      `https://wa.me/?text="${randomQuote.quote}"%20${randomQuote.author}`
    );
  };

  const getQuotes = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      let result = await response.json();
      result = result.quotes.map((item) => {
        return { ...item, id: uuidv4() };
      });
      setQuotes(result);
      console.log(result);
      let randomQuote = result[Math.floor(Math.random() * result.length)];
      while (randomQuote.length > 330) {
        randomQuote = result[Math.floor(Math.random() * result.length)];
      }
      setcurrQuote(randomQuote);
      setColor(getRandomColor());
      setxLink(
        `https://x.com/intent/tweet?text="${randomQuote.quote}"%20${randomQuote.author}&hashtags=quotes`
      );
      setwpLink(
        `https://wa.me/?text="${randomQuote.quote}"%20${randomQuote.author}`
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

  window.speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    console.log(voices);
  };

  const speakQuote = () => {
    const utterance = new SpeechSynthesisUtterance(
      `${currQuote.quote} by ${currQuote.author})`
    );
    utterance.voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === "Google US English");
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <searchContext.Provider value={{ color, currQuote, setcurrQuote }}>
        <div className="fixed w-full flex items-center justify-around z-10">
          <History></History>
        </div>
      </searchContext.Provider>

      <div
        className="w-screen h-screen flex justify-center items-center transition
        duration-1000"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
      >
        <div
          id="quote-box"
          className="w-full max-w-[550px] bg-white rounded-xl p-9 transition-all duration-1000 shadow-lg m-3 outline outline-black/5 scale-85 md:scale-100"
        >
          <AnimatePresence mode="wait">
            {!loading && currQuote && (
              <motion.div
                key={currQuote.quote}
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
                  <span className="playfair-display-content">
                    {currQuote.quote}
                  </span>
                </div>
                <div
                  id="author"
                  style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  className="transition duration-1000 text-right text-lg mt-4"
                >
                  <span className="playfair-display-content">
                    -- {currQuote.author}
                  </span>
                </div>
              </motion.div>
            )}
            {error && (
              <div className="text-red-600 text-center mb-4 font-semibold text-3xl">
                {error}
              </div>
            )}
          </AnimatePresence>
          <div
            id="button-div"
            className="flex justify-evenly mt-8 flex-wrap items-center gap-2"
          >
            <div id="message-buttons" className="flex gap-2 flex-wrap">
              <a href={xLink || ""} target="_blank" rel="noopener noreferrer">
                <button
                  id="tweet-quote"
                  style={{
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  }}
                  className="text-white p-2 rounded-sm cursor-pointer transition duration-1000 h-14"
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
                  className="text-white p-2 rounded-sm cursor-pointer transition duration-1000 h-14"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/dnphlhar.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                  ></lord-icon>
                </button>
              </a>
              <Copy
                quote={currQuote?.quote}
                author={currQuote?.author}
                color={color}
              ></Copy>
              <button
                style={{
                  backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
                className="text-white p-2 rounded-sm cursor-pointer transition duration-1000 h-14"
                onClick={speakQuote}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/txfzrzvh.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#ffffff,secondary:#ffffff"
                ></lord-icon>
              </button>
            </div>
            <button
              id="new-quote"
              onClick={getRandomQuote}
              style={{
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              }}
              className="text-white p-2 rounded-sm cursor-pointer transition-colors duration-1000 montserrat-content h-14"
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
