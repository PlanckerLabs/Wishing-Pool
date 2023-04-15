pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WisherNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("wisher", "WISHER") {}

    function mintWisherNFT(address recipient) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}

contract WisherETH is ERC20 {
    constructor() ERC20("wisherETH", "wisherETH") {}

    function mintWisherETH(address recipient, uint256 amount) public {
        _mint(recipient, amount);
    }
}

contract WisherIssuer is Ownable {
    using Counters for Counters.Counter;

    WisherNFT private _wisherNFT;
    WisherETH private _wisherETH;

    mapping(uint256 => mapping(address => uint256)) public wishStakeAmounts;
    mapping(uint256 => uint256) public totalStakedPerWish;

    event Staked(address indexed user, uint256 indexed wishID, uint256 amount);

    constructor() {
        _wisherNFT = new WisherNFT();
        _wisherETH = new WisherETH();
    }

    function mint() public payable {
        require(msg.value >= 0.01 ether, "At least 0.01 ether is required.");
        uint256 tokenId = _wisherNFT.mintWisherNFT(msg.sender);
        _wisherETH.mintWisherETH(msg.sender, msg.value);
    }

    function stake(uint256 amount, uint256 wishID) public {
        _wisherETH.transferFrom(msg.sender, address(this), amount);
        wishStakeAmounts[wishID][msg.sender] += amount;
        totalStakedPerWish[wishID] += amount;
        emit Staked(msg.sender, wishID, amount);
    }

    function getWisherNFTAddress() public view returns (address) {
        return address(_wisherNFT);
    }

    function getWisherETHAddress() public view returns (address) {
        return address(_wisherETH);
    }
}
