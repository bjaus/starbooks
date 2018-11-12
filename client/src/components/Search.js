import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      select: ""
    };
    this.searchSelector = this.searchSelector.bind(this);
  }

  searchSelector(e) {
    if (e.target.value !== this.state.select) {
      this.setState({
        select: e.target.value
      });
    }
  }

  render() {
    return (
      <div className="search-box">
        <form className="form-group form-inline">
          <input
            type="text"
            name={this.props.name ? this.props.name : "search"}
            onChange={this.props.onFilter()}
            placeholder="Search"
            className="form-control input-lg"
          />
          <select className="form-control" onChange={this.searchSelector}>
            <option defaultValue="default">Select</option>
            <option value="status">Status</option>
            <option value="error">Error</option>
          </select>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default Search;
