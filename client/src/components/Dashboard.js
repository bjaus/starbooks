import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
import FileUpload from "./FileUpload";
import Table from "./Table";
import "./component.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tHead: [],
      filter: "",
      errors: {}
    };

    this.fetchData = this.fetchData.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("/api/satellites")
      .then(res => {
        let cols = Object.keys(res.data[0]);
        this.setState({
          data: res.data,
          asc: cols.reduce((acc, cur) => {
            return Object.assign({}, acc, { [cur]: null });
          }),
          tHead: cols.map(head => {
            return head
              .trim()
              .split("_")
              .map(v => {
                let x = v.charAt(0).toUpperCase();
                let y = v.substr(1).toLocaleLowerCase();
                return `${x}${y}`;
              })
              .join(" ");
          })
        });
      })
      .catch(err => console.log(err));
  };

  onFileUpload(data) {
    axios
      .post("/api/upload", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.fetchData();
  }

  onFilter(event) {
    console.log("filter");
    // let newData = this.state.data.filter(item => {
    //   console.log(item);
    //   for (let key in item) {
    //     let v = item[key] && item[key].toString().toLowerCase();
    //     if (v && v.indexOf(event.target.value.toLowerCase()) !== -1) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });

    // this.setState({
    //   filter: event.target.value,
    //   data: newData
    // });
  }

  onSort(dKey, nAsc) {
    let newAsc = this.state.asc;
    let newData = this.state.data;

    newData.sort((a, b) => {
      if (a[dKey] === b[dKey]) return 0;
      if (nAsc ? a[dKey] > b[dKey] : a[dKey] < b[dKey]) return 1;
      if (nAsc ? a[dKey] < b[dKey] : a[dKey] > b[dKey]) return -1;
      return 0;
    });

    for (let prop in newAsc) {
      newAsc[prop] = null;
    }

    this.setState({
      asc: Object.assign({}, newAsc, { [dKey]: nAsc }),
      data: newData
    });
  }

  render() {
    const myData = [
      {
        satellite_id: 42,
        timestamp: "2025-02-14T01:51:44.000Z",
        set_id: 29,
        status: "Ok",
        condition: "Good",
        errors: []
      },
      {
        satellite_id: 42,
        timestamp: "2025-02-14T01:51:44.000Z",
        set_id: 30,
        status: "DAMAGED",
        condition: "Debris damage, loss of 50%",
        errors: ["Unknown debris collision"]
      },
      {
        satellite_id: 42,
        timestamp: "2025-02-14T01:51:44.000Z",
        set_id: 31,
        status: "OK",
        condition: "Repaired",
        errors: []
      },
      {
        satellite_id: 2018,
        timestamp: "2018-10-20T01:11:44.000Z",
        set_id: 1,
        status: "Not Ok",
        condition: "Bad",
        errors: ["So many", "errors"]
      },
      {
        satellite_id: 2018,
        timestamp: "2018-10-20T01:11:44.000Z",
        set_id: 2,
        status: "DAMAGED",
        condition: "Debris damage, loss of 50%",
        errors: ["Unknown debris collision"]
      },
      {
        satellite_id: 2018,
        timestamp: "2018-10-20T01:11:44.000Z",
        set_id: 3,
        status: "OK",
        condition: "Repaired",
        errors: []
      },
      {
        satellite_id: 158,
        timestamp: "2018-10-14T06:18:24.000Z",
        set_id: 1,
        status: "Not Ok",
        condition: "Bad",
        errors: ["So many", "errors"]
      },
      {
        satellite_id: 158,
        timestamp: "2018-10-14T06:18:24.000Z",
        set_id: 2,
        status: "OK",
        condition: "Good",
        errors: []
      },
      {
        satellite_id: 158,
        timestamp: "2018-10-14T06:18:24.000Z",
        set_id: 3,
        status: "DAMAGED",
        condition: "Debris damage, loss of 50%",
        errors: ["Unknown debris collision"]
      },
      {
        satellite_id: 158,
        timestamp: "2018-10-14T06:18:24.000Z",
        set_id: 5,
        status: "OK",
        condition: "Repaired",
        errors: []
      },
      {
        satellite_id: 169,
        timestamp: "2018-10-14T06:05:04.000Z",
        set_id: 2,
        status: "Broken",
        condition: "Bad",
        errors: []
      },
      {
        satellite_id: 169,
        timestamp: "2018-10-14T06:05:04.000Z",
        set_id: 3,
        status: "DAMAGED",
        condition: "Debris damage, loss of 50%",
        errors: ["Unknown debris collision"]
      },
      {
        satellite_id: 169,
        timestamp: "2018-10-14T06:05:04.000Z",
        set_id: 5,
        status: "OK",
        condition: "Repaired",
        errors: []
      }
    ];
    const myHead = [
      "Satellite ID",
      "Timestamp",
      "Set ID",
      "Status",
      "Condition",
      "Errors"
    ];

    const tData = myData.map(data => {
      let count = -1;
      return (
        <tr>
          {Object.keys(data).map(key => {
            count++;
            return <td key={count}>{data[key]}</td>;
          })}
        </tr>
      );
    });

    const tHead = myHead.map(head => {
      return <th>{head}</th>;
    });

    return (
      <div id="dashboard" className="container-fluid">
        <div id="search-upload" className="row">
          <div className="col-1" />
          <div className="col-5">
            <Search
              name="search"
              onFilter={this.onFilter}
              data={this.state.data}
            />
          </div>
          <div className="col-5">
            <FileUpload onUpload={this.onFileUpload} />
          </div>
          <div className="col-1" />
        </div>
        <table className="table table-light table-striped">
          <thead>
            <tr>{tHead}</tr>
          </thead>
          <tbody>{tData}</tbody>
        </table>
        {/* <div id="table" className="row">
          <div className="col-12">
            <Table tblData={this.state.data} tHead={this.state.tHead} />
          </div>
        </div> */}
      </div>
    );
  }
}

export default Dashboard;
