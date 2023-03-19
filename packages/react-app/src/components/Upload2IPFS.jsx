import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

require("dotenv").config();

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID;
const projectSecret = process.env.REACT_APP_IPFS_PROJECT_SECRET;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

/* create the client */
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

function Upload2IPFS({ onCIDChange }) {
  const [fileUrl, updateFileUrl] = useState("");
  const [CID, updateCID] = useState("");

  async function handleFileUpload(file) {
    console.log("Selected file:", file);
    //const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      updateCID(added.path);
      onCIDChange(added.path);
      updateFileUrl(url);
      console.log("IPFS URI: ", url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const beforeUpload = file => {
    handleFileUpload(file);
    return false; // prevent actual upload to server
  };
  return (
    <>
      <div>
        <Upload beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </div>
      {fileUrl && (
        <div>
          {/* <img src={fileUrl} width="200px" alt="ProjectImage" /> */}
          <a href={fileUrl} target="_blank" rel="noreferrer">
            {CID}
          </a>
        </div>
      )}
    </>
  );
}

export default Upload2IPFS;
