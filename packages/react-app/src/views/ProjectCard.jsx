import { Button, Divider, Image } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";

import { Upload2IPFS, Timer, EventsArboracle } from "../components";

import brazil from "../images/brazil.jpg";
import costaRica from "../images/costaRica.jpg";
import colombia from "../images/colombia.jpg";

export default function ProjectCard({
  image2Display,
  healthScore,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [CID, setCID] = useState("");
  const handleCID = newCID => {
    setCID(newCID);
    console.log(`The CID is: ${CID}`);
  };

  const [showTimer, setShowTimer] = useState(false);
  const [ancillary, setAncillary] = useState("");

  let display = "";
  let contractName = "Arboracle";

  if (image2Display === "brazil") {
    display = brazil;
  } else if (image2Display === "costaRica") {
    display = costaRica;
  } else {
    display = colombia;
  }

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 500, margin: "auto", marginTop: 64 }}>
        <h1>Example UI:</h1>

        <Divider />
        <Image width={450} height={300} src={display}></Image>
        <Divider />
        <h2>Project Health: {healthScore}/10</h2>
        <Divider />

        <Upload2IPFS onCIDChange={handleCID} />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            const result = tx(writeContracts[contractName].requestData(CID), async update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                setShowTimer(true);
                let temp = await readContracts[contractName].getAncillaryString();
                setAncillary(temp);
              }
            });
          }}
        >
          Submit to Oracle
        </Button>
        <Divider />
        <Timer
          show={showTimer}
          ancillary={ancillary}
          tx={tx}
          writeContracts={writeContracts}
          contractName={contractName}
        />
        <EventsArboracle
          contracts={readContracts}
          contractName={contractName}
          eventName="DataReceived"
          localProvider={localProvider}
          mainnetProvider={mainnetProvider}
          startBlock={1}
        />
        <EventsArboracle
          contracts={readContracts}
          contractName={contractName}
          eventName="DataDisputed"
          localProvider={localProvider}
          mainnetProvider={mainnetProvider}
          startBlock={1}
        />
      </div>
    </div>
  );
}
