import { Button, Divider, Image } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";

import { Upload2IPFS, Timer, EventsArboracle } from "../components";

import brazil from "../images/brazil.jpg";
import costaRica from "../images/costaRica.jpg";
import colombia from "../images/colombia.jpg";

export default function ProjectCard({
  image2Display,
  purpose,
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
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 500, margin: "auto", marginTop: 64 }}>
        <h2>Example UI:</h2>
        <h4>purpose: {purpose}</h4>
        <Divider />
        <Image width={450} height={300} src={display}></Image>
        <Upload2IPFS onCIDChange={handleCID} />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts[contractName].requestData(CID), async update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                setShowTimer(true);
                let temp = await readContracts[contractName].getAncillaryString();
                setAncillary(temp);
              }
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
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

        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* you can also just craft a transaction and send it to the tx() transactor */
              tx({
                to: writeContracts.YourContract.address,
                value: utils.parseEther("0.001"),
                data: writeContracts.YourContract.interface.encodeFunctionData("setPurpose(string)", [
                  "🤓 Whoa so 1337!",
                ]),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Another Example
          </Button>
        </div>
      </div>
    </div>
  );
}
