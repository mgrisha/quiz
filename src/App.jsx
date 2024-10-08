import { useContext } from "react";
import Spinner from "./components/spinner";

import Quiz from "./components/quiz";
import Loader from "./components/loader";
import Thanks from "./components/thanks";

import { StoreContext } from "./context/StoreContext";

const App = () => {
  const { isLoader, thanksPage, loaderPage } = useContext(StoreContext);
  return (
    <div>
      {
        loaderPage ? <Loader /> : (thanksPage ? <Thanks /> : (isLoader ? <></> : <Quiz />))
      }
    </div>
  )
}

export default App;
