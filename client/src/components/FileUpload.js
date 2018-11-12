import React, { Component } from "react";
// import classnames from "classnames";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      error: ""
    };

    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler = event => {
    const file = event.target.files[0];
    if (file.type === "application/json") {
      this.setState({
        file: file,
        error: "",
        ready: false
      });
    } else {
      this.setState({
        file: file,
        error: "JSON files only"
      });
    }
  };

  uploadHandler = e => {
    if (this.state.file) {
      const formData = new FormData();
      formData.append("file", this.state.file);
      this.props.onUpload(formData);
      this.setState({
        file: ""
      });
    }
  };

  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <input
              type="submit"
              value="Upload"
              className="input-group-text form-control"
              onClick={this.uploadHandler}
            />
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input input-group-text"
              id="inputFile"
              onChange={this.fileChangedHandler}
            />
            <label
              className="custom-file-label input-group-text"
              htmlFor="inputFile"
            >
              {this.state.file ? `${this.state.file.name}` : "Choose File"}
            </label>
          </div>
        </div>
      </div>
    );
  }
}
