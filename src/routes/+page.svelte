<script lang="ts">
	import { approveERC20Token, getBalanceOfToken } from '$lib/token';
	import onboard from '$lib/web3onboard';
	let tokenBalance = '0';
	let tokenAddress = '';
	let balanceLoading = false;

	let amount = '';
	let contractAddress = '';
	let tokenToApproveAddress = '';
	let approveLoading = false;

	// Subscribe to wallet updates
	const wallets$ = onboard.state.select('wallets');

	const connect = async () => {
		await onboard.connectWallet();
	};

	const disconnect = () => {
		onboard.disconnectWallet({ label: $wallets$?.[0]?.label });
	};

	const approveToken = async () => {
		console.log('approving token...');
		approveLoading = true;
		try {
			const txn = await approveERC20Token(
				amount.trim(),
				contractAddress.trim(),
				tokenToApproveAddress.trim(),
				provider
			);
			console.log('txn :>> ', txn);
		} catch (error) {
			console.error('Error approving token:', error);
		} finally {
			approveLoading = false;
		}
	};

	const getWalletBalanceOfToken = async () => {
		console.log('fetching balance...');
		balanceLoading = true;
		try {
			const balance = await getBalanceOfToken(address.trim(), tokenAddress.trim(), provider);
			console.log('balance :>> ', balance);
			tokenBalance = balance;
		} catch (error) {
			console.error('Error fetching balance:', error);
		} finally {
			balanceLoading = false;
		}
	};

	// The first wallet in the array of connected wallets
	$: connectedAccount = $wallets$?.[0];
	$: provider = connectedAccount?.provider;
	$: address = connectedAccount?.accounts?.[0]?.address;
	$: currentChain = Number(connectedAccount?.chains[0].id);
</script>

<main class="flex h-screen flex-col items-center justify-center">
	{#if connectedAccount}
		<div class="flex flex-col items-center justify-center gap-4">
			<p>Address: {address}</p>
			<p>Chain: {currentChain}</p>
			<div class="flex items-center justify-between gap-4">
				<input
					class="rounded-md border border-gray-300 px-4 py-2"
					type="text"
					bind:value={amount}
					placeholder="Amount without decimal"
				/>
				<input
					class="rounded-md border border-gray-300 px-4 py-2"
					type="text"
					bind:value={contractAddress}
					placeholder="Contract address to allow spending"
				/>
				<input
					class="rounded-md border border-gray-300 px-4 py-2"
					type="text"
					bind:value={tokenToApproveAddress}
					placeholder="Token contract address"
				/>
				<button class="rounded-md bg-blue-500 px-4 py-2 text-white" on:click={() => approveToken()}>
					{approveLoading ? 'Approving...' : 'Approve Token for Contract'}
				</button>
			</div>
			<p>Token Balance: {tokenBalance}</p>
			<div class="flex items-center justify-between gap-4">
				<div>USDC (Polygon): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359</div>
				<input
					class="rounded-md border border-gray-300 px-4 py-2"
					type="text"
					bind:value={tokenAddress}
				/>
				<button
					class="rounded-md bg-green-500 px-4 py-2 text-white"
					on:click={() => getWalletBalanceOfToken()}
				>
					{balanceLoading ? 'Fetching...' : 'Get Token Balance'}
				</button>
			</div>
			<div class="flex items-center justify-between gap-4">
				<button class="rounded-md bg-red-500 px-4 py-2 text-white" on:click={disconnect}>
					Disconnect
				</button>
			</div>
		</div>
	{:else}
		<div>
			<button class="rounded-md bg-blue-500 px-4 py-2 text-white" on:click={connect}>
				Connect
			</button>
		</div>
	{/if}
</main>
