import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Pagination from "rc-pagination";
import { Row, Col } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import { searchMovies } from "./redux/action";
import Movie from "./Movie";

class MovieList extends Component {
  state = {
    movies: [],
    current: 1
  };

  onChange = page => {
    this.setState(
      {
        current: page,
        loading: true
      },
      () => {
        const { searchTerm } = this.props;
        const { current } = this.state;
        this.props.searchMovies(searchTerm, current);
      }
    );
  };

  render() {
    const { current } = this.state;
    const {
      movies,
      totalpages,
      searchTerm,
      loading,
      response,
      error
    } = this.props;
    return (
      <div>
        {searchTerm && searchTerm !== "" ? (
          <div>
            {loading ? (
              <OopsContainer>
                <img src={require("./loader.svg")} alt="error" width="300" />
                <h2>Loading...</h2>
              </OopsContainer>
            ) : (
              <div>
                {response && response !== "False" ? (
                  <MovieGrid>
                    {movies
                      ? movies.map((movie, id) => (
                          <Movie key={id} details={movie} />
                        ))
                      : ""}
                  </MovieGrid>
                ) : (
                  <ErrorContainer>
                    <img src={require("./oops.jpg")} alt="error" width="300" />
                    <h2>{error}</h2>
                  </ErrorContainer>
                )}
              </div>
            )}
          </div>
        ) : (
          <ErrorContainer>
            <img src={require("./fav.jpg")} alt="error" width="300" />
            <h2>Search your Favourite movie</h2>
          </ErrorContainer>
        )}
        <Row
          className="justify-content-md-center"
          style={{ justifyContent: "center", marginTop: "30px" }}
        >
          {totalpages && totalpages > 10 ? (
            <Pagination
              onChange={this.onChange}
              current={current}
              total={totalpages}
            />
          ) : (
            ""
          )}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    totalpages: state.totalpages,
    searchTerm: state.searchTerm,
    response: state.response,
    error: state.error,
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  { searchMovies }
)(MovieList);

const MovieGrid = styled(Row)`
  padding: 0 10rem;
  margin: 0 auto;
  justify-content: center;
  height: calc(100vh - 150px);
  overflow: auto;
`;

export const ErrorContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OopsContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;