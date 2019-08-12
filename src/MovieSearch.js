import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { searchMovies } from "./redux/action";

class MovieSearch extends Component {
  state = {
    searchTerm: ""
  };

  handleChange = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      const { searchTerm } = this.state;
      //   if (searchTerm.length > 1) {
      this.props.searchMovies(searchTerm, 1);
      //   }
    });
  };

  render() {
    return (
      <div>
        <SearchInput
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchTerm: state.searchTerm };
}
export default connect(
  mapStateToProps,
  { searchMovies }
)(MovieSearch);

const SearchInput = styled.input`
  border: 1px solid #222;
  border-radius: 5px;
  width: 300px;
  padding: 0 10px;
`;
