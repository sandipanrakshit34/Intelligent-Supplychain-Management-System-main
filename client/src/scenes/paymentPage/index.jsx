import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from "react";
import { formatEther } from "viem/utils";
import { parseEther } from "viem";
import { PaymentABI , PaymentAddress } from '../../constants';
import { Container, Box, Typography, TextField, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
} from "wagmi";
import Navbar from '../navbar';


const PaymentPage = () => {

    const { address, isConnected } = useAccount();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: hash, writeContract } = useWriteContract();
    const [amountInUSD, setAmountInUSD] = useState(null);
    const [amountInETH, setAmountInETH] = useState(null);
    const [receiverAddress, setReceiverAddress] = useState("");
    const [nameOfUser, setNameOfUser] = useState("");
    const [withdrawAmountInETH, setWithdrawAmountInETH] = useState(null);
  
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });
  
    const { data: currentUserdetails } = useReadContract({
      abi: PaymentABI,
      address: PaymentAddress,
      functionName: "getUser",
      args: [address],
    });
    console.log(address);
    console.log("currentUserdetails", currentUserdetails);
  
    const { data: receipts } = useReadContract({
      abi: PaymentABI,
      address: PaymentAddress,
      functionName: "getReceipts",
      args: [address],
    });
    console.log("Receipts", receipts);
  
    async function registerUser() {
      setLoading(true);
      try {
        await writeContract({
          abi: PaymentABI,
          address: PaymentAddress,
          functionName: "registerUser",
          args: [nameOfUser],
        });
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
      setLoading(false);
      setNameOfUser("");
    }
  
    async function Deposit() {
      setLoading(true);
      try {
        await writeContract({
          abi: PaymentABI,
          address: PaymentAddress,
          functionName: "deposit",
          value: [parseEther(amountInETH)],
        });
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
      setLoading(false);
      setAmountInETH("");
    }
  
    async function transfer() {
      setLoading(true);
      try {
        await writeContract({
          abi: PaymentABI,
          address: PaymentAddress,
          functionName: "transfer",
          args: [amountInUSD, receiverAddress],
        });
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
      setLoading(false);
      setReceiverAddress("");
      setAmountInUSD("");
    }
  
    async function withdraw() {
      setLoading(true);
      try {
        await writeContract({
          abi: PaymentABI,
          address: PaymentAddress,
          functionName: "withdraw",
          args: [parseEther(withdrawAmountInETH)],
        });
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
      setLoading(false);
      setWithdrawAmountInETH("");
    }
  
    if (!isConnected) {
        return (
        <>
            <Navbar></Navbar>
          <Box
            sx={{
              backgroundImage: "url('/mainbackground.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Container>
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h1" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'white', fontSize: '5rem' }}>
                 Warehouse Decentralized Payment System
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 10,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  p: 6,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ width: { xs: '100%', lg: '60%' }, mb: { xs: 6, lg: 0 } }}>
                  <Typography
                    variant="body1"
                    sx={{ color: 'white', fontFamily: 'monospace', fontSize: '1.125rem', lineHeight: 1.75 }}
                  >
                    Welcome 
                    to our decentralized 
                    payment system, a next-generation 
                    solution for secure, transparent, 
                    and efficient financial transactions.
                     Built on blockchain technology, our 
                     platform eliminates the need for 
                     intermediaries, allowing users to 
                     send and receive payments directly in
                      their local currencies with low 
                      fees and near-instant processing
                       times. Our system leverages smart
                        contracts to automate and enforce 
                        payment terms, ensuring trust and
                         reliability in every transaction.
                          Whether you are a business or an individual, our decentralized payment system empowers you to take control of your finances in a fully decentralized, borderless environment. Experience the future of payments today—where your money is truly yours.
                  </Typography>
                  <Box sx={{ mt: 5 }}>
                    <ConnectButton />
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
          </>
        );
    }
   
      return (
        <>
         <Navbar></Navbar>
        <Box
        sx={{
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'black',
          color: 'white',
          p: 4,
        }}
      >
        
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h1" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
            Warehouse Decentralized Payment System
            </Typography>
          </Box>
  
          <Paper elevation={6} sx={{ p: 6, mb: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4">Register User</Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              placeholder="Add Name"
              value={nameOfUser}
              onChange={(e) => setNameOfUser(e.target.value)}
              sx={{ mb: 4,  }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={registerUser}
              disabled={loading}
              sx={{ mb: 4 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Paper>
  
          <Paper elevation={6} sx={{ p: 6, mb: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4">Deposit</Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Amount (ETH)"
              placeholder="Deposit in ETH"
              fontcolor='black'
              type="number"
              value={amountInETH}
              onChange={(e) => setAmountInETH(e.target.value)}
              sx={{ mb: 4,  }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={Deposit}
              disabled={loading}
              sx={{ mb: 4 }}
            >
              {loading ? 'Depositing...' : 'Deposit'}
            </Button>
          </Paper>
  
          <Paper elevation={6} sx={{ p: 6, mb: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4">Transfer</Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Amount (USD)"
              placeholder="Transfer in USD"
              type="number"
              value={amountInUSD}
              onChange={(e) => setAmountInUSD(e.target.value)}
              sx={{ mb: 4,  }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Receiver Address"
              placeholder="Receiver Address"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              sx={{ mb: 4,  }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={transfer}
              disabled={loading}
              sx={{ mb: 4 }}
            >
              {loading ? 'Transferring...' : 'Transfer'}
            </Button>
          </Paper>
  
          <Paper elevation={6} sx={{ p: 6, mb: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4">Withdraw</Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Amount (ETH)"
              placeholder="Withdraw in ETH"
              type="number"
              value={withdrawAmountInETH}
              onChange={(e) => setWithdrawAmountInETH(e.target.value)}
              sx={{ mb: 4,  }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={withdraw}
              disabled={loading}
              sx={{ mb: 4 }}
            >
              {loading ? 'Withdrawing...' : 'Withdraw'}
            </Button>
          </Paper>
  
          <Paper
      elevation={6}
      sx={{
        p: 6,
        mb: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '12px',
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: '0.1rem' }}>
          User Details
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Name:</strong> {currentUserdetails?.name || 'N/A'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Balance in Wallet:</strong> {currentUserdetails?.balance
          ? `${parseFloat(formatEther(currentUserdetails.balance)).toFixed(4)} ETH`
          : '0.0000 ETH'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Address Of User:</strong> {currentUserdetails?.userAddress || 'N/A'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Status:</strong> {currentUserdetails?.isRegistered ? 'Registered' : 'Not Registered'}
      </Typography>
    </Paper>
  
          <Paper elevation={6} sx={{ p: 6, mb: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4">Receipts</Typography>
            </Box>
            {receipts?.length === 0 ? (
              <Typography variant="body1">No receipts found</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sender</TableCell>
                    <TableCell>Receiver</TableCell>
                    <TableCell>Amount (ETH)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts?.map((receipt, index) => (
                    <TableRow key={index}>
                      <TableCell>{receipt.sender}</TableCell>
                      <TableCell>{receipt.receiver}</TableCell>
                      <TableCell>
                        {parseFloat(formatEther(receipt.amount)).toFixed(18)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Container>
      </Box>
      </>
      );
}

export default PaymentPage