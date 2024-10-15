export const PaymentAddress = "0x0f0dD32ec8Efa6cbCC80d181340EB6A91045B34C";

export const PaymentABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_priceFeedAddress", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "addressToReceipt",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addressToUser",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "userAddress", type: "address", internalType: "address" },
      { name: "isRegistered", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "convertUSDToETH",
    inputs: [{ name: "amountInUSD", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getReceipts",
    inputs: [{ name: "userAddress", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Payment.Receipt[]",
        components: [
          { name: "sender", type: "address", internalType: "address" },
          { name: "receiver", type: "address", internalType: "address" },
          { name: "amount", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUser",
    inputs: [{ name: "userAddress", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Payment.User",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "balance", type: "uint256", internalType: "uint256" },
          { name: "userAddress", type: "address", internalType: "address" },
          { name: "isRegistered", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerUser",
    inputs: [{ name: "_name", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "transferAmountInUSD", type: "uint256", internalType: "uint256" },
      {
        name: "receiverAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "withdrawAmountInETH", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
