import { Link, useLoaderData } from "react-router-dom";

import "./App.css";

function App() {
  const dataLoad = useLoaderData();

  return (
    <div className="App">
      {dataLoad &&
        dataLoad.map((element) => {
          return (
            <div key={element.id} className="df-column card-listenings">
              <p>
                <Link to={`listings/details/${element.id}`}>
                  {element.title}
                </Link>
              </p>
              <p>{element.description}</p>
              <p>{element.price}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
