export const ProxySwap =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newRouterAddress",
				"type": "address"
			}
		],
		"name": "editRouterAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_srcToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_dstToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ethAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint24",
				"name": "_poolFee",
				"type": "uint24"
			}
		],
		"name": "multiHubSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_srcToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_destToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint24",
				"name": "_poolFee",
				"type": "uint24"
			}
		],
		"name": "singleSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_routerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "swapRouter",
		"outputs": [
			{
				"internalType": "contract ISwapRouter",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]