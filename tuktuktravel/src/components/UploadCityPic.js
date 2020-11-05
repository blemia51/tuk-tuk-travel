import React from "react";
import { post } from "axios";
import { connect } from "react-redux";
import logoOk from "../assets/img/logoOk.png";
import { uploadCityPic } from "actions/cityPicActions";

class UploadCityPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      isUpload: false,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const url = "/uploaddufichier";
    const formData = new FormData();
    formData.append("file", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    post(url, formData, config).then((response) => {
      // this.props.dispatch({
      //   type: "SEND_CITY_PIC",
      //   cityPic: this.state.file.name,
      // });
      uploadCityPic(this.state.file.name)
      this.setState({
        isUpload: true,
      });
      this.props.onUpload();
    });
  }

  handleChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div>
        {/*<form className="upload-file" onSubmit={this.onFormSubmit}>*/}
        <p className="title-add-avatar">Ajoute une image</p>
        <input
          type="file"
          name="file"
          className="avatar"
          onChange={this.handleChange}
          id="cityPic"
        />
        <button onClick={this.onFormSubmit} className="upload-avatar">
          Ajouter
        </button>
        {this.state.isUpload ? (
          <div className="okUser">
            <div className="logo-ok">
              <img src={logoOk} alt="logo Ok" />
            </div>
            <p className="user-added">Fichier transféré avec succès</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UploadCityPic;
