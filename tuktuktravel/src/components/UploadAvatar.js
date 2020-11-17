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
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    post(url, formData, config).then((response) => {
      this.setState({
        isUpload: true,
      });
    });
  }

  handleChange = (e) => {
    this.setState({ file: e.target.files[0] });
    if (e.target.files.length === 1) {
      const file = e.target.files[0]
      this.setState({ file: file });
      this.props.uploadAvatar(file.name);
    }
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
