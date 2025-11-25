// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";

interface IProductNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract SupplyChain is AccessControl {
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant SHIPPER_ROLE = keccak256("SHIPPER_ROLE");
    bytes32 public constant WAREHOUSE_ROLE = keccak256("WAREHOUSE_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    enum Status { Created, Shipped, Warehoused, Delivered }
    mapping(uint256 => Status) public productStatus;

    IProductNFT public nftContract;

    event StatusChanged(uint256 indexed tokenId, Status newStatus, address actor, uint256 timestamp);

    constructor(address nftAddress) {
        nftContract = IProductNFT(nftAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function updateStatus(uint256 tokenId, Status newStatus) external {
        require(_canUpdate(msg.sender, newStatus), "Not authorized for this status");
        productStatus[tokenId] = newStatus;
        emit StatusChanged(tokenId, newStatus, msg.sender, block.timestamp);
    }

    function _canUpdate(address user, Status newStatus) internal view returns (bool) {
        if (newStatus == Status.Shipped && hasRole(SHIPPER_ROLE, user)) return true;
        if (newStatus == Status.Warehoused && hasRole(WAREHOUSE_ROLE, user)) return true;
        if (newStatus == Status.Delivered && hasRole(RETAILER_ROLE, user)) return true;
        return false;
    }

    function grantManufacturer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MANUFACTURER_ROLE, account);
    }
    function grantShipper(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(SHIPPER_ROLE, account);
    }
    function grantWarehouse(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(WAREHOUSE_ROLE, account);
    }
    function grantRetailer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(RETAILER_ROLE, account);
    }
    function grantAuditor(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(AUDITOR_ROLE, account);
    }
}
