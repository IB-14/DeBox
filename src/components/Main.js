import React, { Component } from 'react';
import { convertBytes } from './helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import moment from 'moment'

class Main extends Component {
  state = {
    copied: false,
  };
  
  componentDidUpdate() {
      const actualBtn = document.getElementById('actual-btn');
      const fileChosen = document.getElementById('file-chosen');
      actualBtn.addEventListener('change', function(){
      fileChosen.textContent = this.files[0].name
  })
  }

  copyShareLink() {
    alert("Share Link Copied to Clipboard")
  }

  render() {
    return (
      <div className="container-fluid  text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <div className="card mx-auto " style={{ maxWidth: '512px', backgroundColor:"transparent", marginBottom:"80px" }}>
                <h1 className="text-white  mt-4 mb-2" style={{backgroundColor:"transparent", fontWeight:"700"}}>Upload File</h1>
                  <form onSubmit={(event) => {
                    console.log("form submitted");
                    event.preventDefault();
                    const description = this.fileDescription.value;
                    this.props.uploadFile(description);
                  }} >
                      <input type="file" id="actual-btn" onChange={this.props.captureFile} className="text-white chz"/>
                      <label className="choose-button" for="actual-btn">
                        Choose File
                      </label>
                      <span id="file-chosen">No file chosen</span>
                      <div className="form-group">
                          <textarea
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control "
                            placeholder="Enter File Description..."
                            rows="5"
                            required />
                      </div>
                      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <button type="submit" className="upload-button">Upload!</button>
                      </div>
                  </form>
              </div>

              <h1 className="text-white  my-4" style={{backgroundColor:"transparent", fontWeight:"700"}}>View Files</h1>
              <table className="table-sm" style={{ width: '1000px', maxHeight: '450px', marginBottom:"150px"}}>
                <thead style={{ 'fontSize': '15px' }} className="table_heading">
                  <tr className=" text-white">
                    <th scope="col" style={{ width: '10px', borderTopLeftRadius: '15px'}}>id</th>
                    <th scope="col" style={{ width: '200px'}}>name</th>
                    <th scope="col" style={{ width: '230px'}}>description</th>
                    <th scope="col" style={{ width: '120px'}}>type</th>
                    <th scope="col" style={{ width: '90px'}}>size</th>
                    <th scope="col" style={{ width: '90px'}}>date</th>
                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                    <th scope="col" style={{ width: '120px', borderTopRightRadius: '15px', borderRight: "none"}}>hash/view/get</th>
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          {/* <a
                            href={"https://ipfs.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a> */}
                          <CopyToClipboard text={"https://ipfs.io/ipfs/" + file.fileHash}
                            onCopy={() => {this.setState({copied: true}); this.copyShareLink()}}>
                            <button className="link"><i class="fas fa-link"></i></button>
                          </CopyToClipboard>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;