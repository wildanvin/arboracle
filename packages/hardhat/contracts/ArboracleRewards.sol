// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UMAInterfaces/OptimisticOracleV2Interface.sol";

contract ArboracleRewards {

    event DataReceived (address _address, string _string, uint256 _time);
    event DataDisputed (address _address, string _string, uint256 _time);

    string[] public data;
    bytes projectName;
    uint public healthScore;

    // Create an Optimistic oracle instance at the deployed address on Görli.
    OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);

    // Use the yes no idetifier to ask arbitary questions, such as the weather on a particular day.
    bytes32 identifier = bytes32("YES_OR_NO_QUERY");

    //Ancillary Data variables
    bytes ancillaryPart1 = bytes("IPFS CID: ");
    bytes public IPFS;
    bytes ancillaryPart2 = bytes(" is a file representing the actual state of reforestation project ");
    bytes questionMark = bytes("?");
    bytes public ancillaryData;

    uint256 requestTime = 0; 

    constructor (string memory _string) {
        projectName = bytes(_string);
    }

    // Submit a data request to the Optimistic oracle and "proposePrice" in the same tx.
    function requestData(string memory _IPFS) payable public {
        require(msg.value == 0.01 ether, "No enough bond value");
        requestTime = block.timestamp;
        IPFS = bytes(_IPFS);
        ancillaryData = abi.encodePacked(ancillaryPart1, IPFS, ancillaryPart2, projectName );

        IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6); // Use Görli WETH as the bond currency.
        uint256 reward = 0.001 ether; 
        uint256 bond = 0.01 ether; 

        //Approve the reward and bond amount to the OO. 
        //Keep in mind that this contract should have a "reward + bond" amount of WETH.
        //We do this because we call requestPrice() and proposePrice() in the same tx and under the hood the OO calls a transferFrom()
        //on the bondCurrency, with a "reward" value and a "bond" value respectively. 
        bondCurrency.approve(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884, reward + bond);
        
        // Now, make the price request to the OO and set the liveness to 30 so it will settle quickly.
        oo.requestPrice(identifier, requestTime, ancillaryData, bondCurrency, reward);
        oo.setCustomLiveness(identifier, requestTime, ancillaryData, 30);

        // We set the bond
        oo.setBond(identifier, requestTime, ancillaryData, bond );
        
        // We propose the "price" in the same tx because the person that submits the photo/data is already sure that the data is correct 
        oo.proposePrice(address(this), identifier, requestTime, ancillaryData, 1);
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest() public {
        oo.settle(address(this), identifier, requestTime, ancillaryData);
        data.push(string(IPFS));
        _calculateHealthScore();
        emit DataReceived(msg.sender, string(IPFS), block.timestamp);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData() public view returns (int256) {
        return oo.getRequest(address(this), identifier, requestTime, ancillaryData).resolvedPrice;
    }

    function dispute () public {
        oo.disputePrice(address(this), identifier, requestTime, ancillaryData);
        emit DataDisputed(msg.sender, string(IPFS), block.timestamp);
    }

    //This function is a mock to calculate the health score.
    //It assigns a "random" number between 5 and 10 to the the healthScore variable
    //In the future this function will call Chainlink or Bacalhau to compute over the data submitted and get a more realistic health score
    function _calculateHealthScore() internal {
        uint timestamp = block.timestamp;
        uint randomNumber = uint(keccak256(abi.encodePacked(timestamp)));
        uint number = (randomNumber % 6) + 5; // range from 0 to 5, add 5 to get range from 5 to 10
        healthScore = number;
    }


    function getAncillaryString() public view returns (string memory) {
        return string(ancillaryData);
    }

    function getProjectName() public view returns (string memory) {
        return string(projectName);
    }
}
