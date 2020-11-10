import React from "react";
import { post } from "axios";
import logoOk from "../assets/img/logoOk.png";

class UploadAvatar extends React.Component {
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
      this.props.uploadAvatar(this.state.file.name);
      this.setState({
        isUpload: true,
      });
    });
  }
  handleChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  render() { 
    const { userProfileAvatar } = this.props;
    const isAvatar = !userProfileAvatar ? 'placeholder-profil.png' : userProfileAvatar;
    return (
      <div className="input--picture ">
      <div className="upload-file" style={{ backgroundImage: `url(${isAvatar})` }}>
        {/* <p className="title-add-avatar">Change ton avatar</p> */}
        <input
          type="file"
          name="file"
          className="avatar"
          onChange={this.handleChange}
          id="avatar"
        />
        </div>
        <label htmlFor="avatar">Modifier</label>
        {/* <button className="send-form-users" onClick={this.onFormSubmit}>
          Changer
        </button> */}
        {this.state.isUpload && (
          <div className="okUser">
            <img src={logoOk} alt="logoOk" className="logoOk" />
            <p className="user-added">Fichier transféré avec succès</p>
          </div>
        )}
      
      </div>
    );
  }
}

export default UploadAvatar;
