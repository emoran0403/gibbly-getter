//*Imports
import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//*Components
import FilmsComp from "./components/FilmsComp";
import PeopleComp from "./components/PeopleComp";

const App = () => {
  const [films, setFilms] = useState([]); // controls the films state
  const [people, setPeople] = useState([]); // controls the people state
  const [view, setView] = useState(0); // controls the view state

  const goHome = () => {
    // this is view 0
    setView(0); // displays the Home view
  };

  const getFilms = () => {
    // this is view 1
    setView(1); // displays the People Component if fetch is successful
  };

  const getPeople = () => {
    // this is view 2
    setView(2); // displays the People Component if fetch is successful
  };

  const getData = async () => {
    try {
      // fetches data from the api
      const response1 = await fetch("https://ghibliapi.herokuapp.com/people"); // this is the fetch
      const peopleData = await response1.json(); // parses the response as JSON data to produce a JS object
      // console.log(peopleData); // logs the people object
      setPeople(peopleData); // passes the people object to the people state, which is then sent to the People Component

      // fetches data from the api
      const response = await fetch("https://ghibliapi.herokuapp.com/films"); // this is the fetch
      const filmData = await response.json(); // parses the response as JSON data to produce a JS object
      // console.log(filmData); // logs the films object
      setFilms(filmData); // passes the films object to the films state, which is then sent to the Films Component
    } catch (error) {
      setView(3); // displays an error page if fetch is unsuccessful
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex mt-5 justify-content-center">
        <button className="btn btn-primary btn-lg mx-2" onClick={goHome}>
          Gibblee Home
        </button>
        <button className="btn btn-primary btn-lg mx-2" onClick={getFilms}>
          Gibblee Films
        </button>
        <button className="btn btn-primary btn-lg mx-2" onClick={getPeople}>
          Gibblie People
        </button>
      </div>

      {view === 0 && ( // this displays Studio Gobblie art as a default page
        <>
          <div className="d-flex mt-4 justify-content-center">
            <img src="Studio_Ghiblei_Logo.jpg" alt="Studio Gibbles" width={1200} height="auto" />
          </div>
        </>
      )}

      {view === 1 && ( // this displays Films Component when the films button is clicked
        <>
          <FilmsComp characters={people} movies={films} />
        </>
      )}

      {view === 2 && ( // this displays People Component when the films button is clicked
        <>
          <PeopleComp characters={people} films={films} />
        </>
      )}

      {view === 3 && ( // this displays when fetch fails
        <>
          <div className="d-flex mt-4 justify-content-center">
            <div>
              <img src="sadgibbliee.jpg" alt="aww" width={608} height="auto" />
            </div>
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <h1>Could not complete the request</h1>
          </div>
        </>
      )}
    </>
  );
};

export default App;
