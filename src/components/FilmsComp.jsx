import React from "react";

const FilmsComp = (props) => {
  // props.movies is the movies object

  const getCharacters = (movie) => {
    let characterIDs = movie.people.map((char) => char.substring(39)).filter((onlystrings) => onlystrings); // characterIDs is an array of character IDs in a particular movie
    // console.log(characterIDs);

    let listOfCharacters = characterIDs.map((characterID) => {
      return props.characters
        .map((propCharacter) => {
          if (propCharacter.id === characterID) {
            return propCharacter.name;
          }
        })
        .filter((onlyChars) => onlyChars)[0];
    });
    return listOfCharacters;
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          {props.movies.map((movie) => (
            <div key={movie.id} className="card col-md-6">
              <img className="card-img-top" src={movie.movie_banner} alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">
                  {movie.title} | {movie.original_title} | {movie.original_title_romanised}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Directed by: {movie.director} | Produced by: {movie.producer}
                </h6>
                <p className="card-text">{movie.description}</p>
                {movie.people[0] !== "https://ghibliapi.herokuapp.com/people/" && <h5>Characters:</h5>}
                <ul>
                  {getCharacters(movie).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <footer className="blockquote-footer">
                  <a className="btn btn-success btn-sm" href={movie.url} target="_blank">
                    View my JSON
                  </a>
                  Release date: {movie.release_date} Run time: {Math.floor(movie.running_time / 60) + " Hrs " + (movie.running_time % 60) + " Mins"}
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilmsComp;
