import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import Overdrive from "react-overdrive";

class Movie extends Component {
  state = {
    imageLoadError: true
  };
  render() {
    const { imageLoadError } = this.state;
    const { details } = this.props;
    return (
      <MovieContainer lg={2} md={1} sm={1}>
        {/* <MovieContainer> */}
        {details.Poster && details.Poster !== "N/A" && imageLoadError ? (
          <Overdrive id={details.imdbID}>
            <Link to={`/movie/${details.imdbID}`}>
              <Poster
                src={details.Poster}
                alt={details.Title}
                onError={e => {
                  if (imageLoadError) {
                    this.setState({
                      imageLoadError: false
                    });
                    // e.target.src = 'fallbackImage.png';
                  }
                }}
              />
            </Link>
          </Overdrive>
        ) : (
          <Link to={`/movie/${details.imdbID}`}>
            <Poster
              src={require("./image-not-available.jpg")}
              alt={details.Title}
            />
          </Link>
        )}

        <Movieinfo>
          <h6>{details.Title}</h6>
          <h6>{details.Year}</h6>
          <p>{details.imdbID}</p>
          <p>{details.Type}</p>
        </Movieinfo>
        {/* </MovieContainer> */}
      </MovieContainer>
    );
  }
}

export default Movie;

Movie.propTypes = {
  details: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired
  }).isRequired
};

const MovieContainer = styled(Col)`
  text-align: center;
  min-width: 275px;
`;

export const Poster = styled.img`
  margin: 20px 0 10px 0;
  width: 175px;
  height: 250px;
  transition: transform .2s;
  box-shadow: 0 0 10px #000;
  &:hover {
    transform: scale(1.1);
  }
`;

const Movieinfo = styled.div`
  color: #222;
  width: 200px;
  margin: 0 auto;
  > h6,
  p {
    margin: 2px 0 0 0;
  }
`;
