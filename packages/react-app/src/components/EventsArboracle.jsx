import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Address from "./Address";

/**
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
**/

export default function EventsAccept({
  contracts,
  contractName,
  eventName,
  localProvider,
  mainnetProvider,
  startBlock,
}) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  function unixTimestampToDate(timestamp) {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const dateString = dateObject.toLocaleString();
    return dateString;
  }

  return (
    <div style={{ width: 400, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      {eventName === "DataReceived" ? <h2>Approved Data:</h2> : <h2>Disputed Data:</h2>}

      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber + "_" + item.args.sender + "_"}>
              <div>
                <span>By: </span>
                <Address address={item.args[0]} ensProvider={mainnetProvider} fontSize={14} />
              </div>

              <div>{unixTimestampToDate(Number(item.args[2]))}</div>

              <div>
                <a href={"https://infura-ipfs.io/ipfs/" + item.args[1]} target="_blank" rel="noreferrer">
                  Data
                </a>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
