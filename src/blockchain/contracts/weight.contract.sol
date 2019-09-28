pragma solidity >=0.4.23;

contract storePolybagWeight {
    address public admin;
    mapping(uint256 => bytes32) public polybagData;

    constructor() public {
        admin = msg.sender;
    }

    function saveData (uint256 polybagId, bytes32 polybagWeight) public returns (bool){
        polybagData[polybagId] = polybagWeight;
        return true;
    }

    function getData (uint256 polybagId) public returns (bytes32){
        return polybagData[polybagId];
    }

}