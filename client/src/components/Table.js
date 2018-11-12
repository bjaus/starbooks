import React, { Component } from "react";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data.map(data => {
        return (
          <tr>
            {Object.keys(data).map(key => {
              return <td>{data[key]}</td>;
            })}
          </tr>
        );
      })
    };
  }
  render() {
    const tblHead = this.props.tHead.map(head => <th>{head}</th>);

    return (
      <table className="table">
        <thead>{tblHead}</thead>
        <tbody>{this.state.data}</tbody>
      </table>
    );
  }
}
