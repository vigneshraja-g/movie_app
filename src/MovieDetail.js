import React, { Component } from "react";
import styled from "styled-components";
import Overdrive from "react-overdrive";
import { Link } from "react-router-dom";
import { Poster } from "./Movie";
import backdrop from "./backdrop.svg";

// import Poster from './Movie';

class MovieDetail extends Component {
  state = {
    movie: {},
    imageLoadError: true,
    response: true,
    error: "",
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${
          this.props.match.params.id
        }&apikey=fa281222`
      );
      const movie = await res.json();
      this.setState({
        loading: false,
        movie
      });
      if (movie.Response === "False") {
        this.setState({ response: false, loading: false, error: movie.Error });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie, imageLoadError, loading, response, error } = this.state;
    return (
      <div>
        {loading ? (
           <OopsContainer>
           <img src={require("./loader.svg")} alt="error" width="300" />
           <h2>Loading...</h2>
         </OopsContainer>
        ) : (
          <div>
            {response ? (
              <MovieContainer>
                <BackTo to="/">Back</BackTo>
                <Movieinfo>
                  {movie.Poster && movie.Poster !== "N/A" && imageLoadError ? (
                    <Overdrive id={movie.imdbID}>
                      <Poster
                        src={movie.Poster}
                        alt={movie.Title}
                        onError={e => {
                          if (this.state.imageLoadError) {
                            this.setState({
                              imageLoadError: false
                            });
                            // e.target.src = 'fallbackImage.png';
                          }
                        }}
                      />
                    </Overdrive>
                  ) : (
                    <Poster
                      src={require("./image-not-available.jpg")}
                      alt={movie.Title}
                    />
                  )}
                  <div>
                    <h2>{movie.Title}</h2>
                    <h5>{movie.Year}</h5>
                    <h5>{movie.Genre}</h5>
                    <p>
                      <b>imdbID:</b> {movie.imdbID}
                    </p>
                    <p>
                      <b>Actor:</b> {movie.Actors}
                    </p>
                    <p>
                      <b>Director:</b> {movie.Director}
                    </p>
                  </div>
                </Movieinfo>
              </MovieContainer>
            ) : (
              <OopsContainer>
                <img src={require("./oops.jpg")} alt="error" width="300" />
                <h2>{error}</h2>
              </OopsContainer>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetail;

const MovieContainer = styled.div`
  position: relative;
  padding-top: calc(40vh - 60px);
  background: url(${backdrop}) no-repeat;
  backdrop-size: cover;
`;

const BackTo = styled(Link)`
  padding: 7px 26px;
  position: absolute;
  background: #ffffffbd;
  top: 14.5rem;
  text-decoration: none !important;
  margin-left: 20px;
  border-radius: 5px;
  color: #222 !important;
  box-shadow: 0 0 2px #222;
  &:hover {
    box-shadow: 0 0 5px #222;
  }
`;

const Movieinfo = styled.div`
  background: #fff;
  padding: 1rem 10%;
  display: flex;
  color: #282d35;
  > div {
    margin-left: 3rem;
    > h2 {
      position: absolute;
      top: 15rem;
      text-shadow: 0 0 2px #737272;
    }
    > h5,
    p {
      margin: 0px !important;
    }
  }

  img {
    position: relative;
    top: -9rem;
  }
`;

export const OopsContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
