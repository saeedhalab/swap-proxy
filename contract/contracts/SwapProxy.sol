// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./Interface/IERC20.sol";

contract SwapProxy {
    address owner;
    ISwapRouter public swapRouter;

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier ValidswapParams(
        address _srcToken,
        address _dstToken,
        uint256 _amount,
        uint256 _poolFee
    ) {
        require(
            _srcToken != address(0) && _dstToken != address(0),
            "Invalid address"
        );
        require(
            _poolFee > 0 && _poolFee <= 3000,
            "Choose a pool fee between 1 and 3000"
        );
        require(_amount > 0, "Invalid amount");
        _;
    }

    constructor(address _routerAddress) {
        swapRouter = ISwapRouter(_routerAddress);
        owner = msg.sender;
    }

    function editRouterAddress(address _newRouterAddress) public OnlyOwner {
        swapRouter = ISwapRouter(_newRouterAddress);
    }

    function singleSwap(
        address _srcToken,
        address _destToken,
        uint256 _amount,
        uint24 _poolFee
    )
        public
        payable
        ValidswapParams(_srcToken, _destToken, _amount, _poolFee)
        returns (uint256)
    {
        IERC20 srcToken = IERC20(_srcToken);

        srcToken.transferFrom(msg.sender, address(this), _amount);

        srcToken.approve(address(swapRouter), _amount);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _srcToken,
                tokenOut: _destToken,
                fee: _poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amount,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        return swapRouter.exactInputSingle(params);
    }

    function multiHubSwap(
        address _srcToken,
        address _dstToken,
        address _ethAddress,
        uint256 _amount,
        uint24 _poolFee
    )
        public
        payable
        ValidswapParams(_srcToken, _dstToken, _amount, _poolFee)
        returns (uint256)
    {
        IERC20 srcToken = IERC20(_srcToken);
        IERC20 dstToken = IERC20(_dstToken);

        srcToken.transferFrom(msg.sender, address(this), _amount);

        srcToken.approve(address(swapRouter), _amount);
        
        ISwapRouter.ExactInputParams memory params = ISwapRouter
            .ExactInputParams({
                path: abi.encodePacked(
                    _srcToken,
                    _poolFee,
                    _ethAddress,
                    _poolFee,
                    dstToken
                ),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amount,
                amountOutMinimum: 0
            });
        return swapRouter.exactInput(params);
    }

    fallback() external payable {}

    receive() external payable {}
}
