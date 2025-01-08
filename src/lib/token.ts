import type { EIP1193Provider } from '@web3-onboard/core';
import { ERC20_ABI } from './erc20Abi';
import { ethers } from 'ethers';

export async function approveERC20Token(
	amount: string,
	contractAddress: string,
	tokenAddress: string,
	provider: EIP1193Provider
) {
	const browserProvider = new ethers.BrowserProvider(provider);
	const signer = await browserProvider.getSigner();
	const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

	try {
		const txn = await tokenContract.approve(contractAddress, BigInt(amount));

		// waiting for the transaction to be mined
		const approveReciept = await txn.wait();

		// if the transaction is not mined, throw an error and show a toast
		if (!approveReciept) {
			throw new Error('Transaction failed');
		}

		// if the transaction is mined, return the txn
		return { txn: txn, approveReciept: approveReciept };
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function getBalanceOfToken(
	walletAddress: string,
	contractAddress: string,
	provider: EIP1193Provider
) {
	const browserProvider = new ethers.BrowserProvider(provider);
	const tokenContract = new ethers.Contract(contractAddress, ERC20_ABI, browserProvider);
	try {
		const balance = await tokenContract.balanceOf(walletAddress);
		return balance;
	} catch (error: any) {
		console.log('error fetching token balance from contract :>> ', contractAddress, error);
		return 0n;
	}
}
