import PropTypes from "prop-types";
import React from "react";
import { post } from "axios";
import logoOk from "../assets/img/logoOk.png";

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
    const url = `https://api.imgbb.com/1/upload`
    //const url = "/uploaddufichier";
    let formData = new FormData();
    formData.set("key", "1910b2849afef3a616530c166ba655ce")
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    post(url, formData, config).then((response) => {
      let imageUrl = (response.data.data.image.url).split('/').slice(3).join('/')
      //this.props.uploadCityPic(this.state.file.name)
      this.props.uploadCityPic(imageUrl)
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

UploadCityPic.propTypes = {
  onUpload: PropTypes.func,
  uploadCityPic: PropTypes.func
}

export default UploadCityPic;
