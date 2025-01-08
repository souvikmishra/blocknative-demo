import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

const injected = injectedWalletsModule();
const walletConnect = walletConnectModule({
	projectId: import.meta.env.VITE_PROJECT_ID,
	requiredChains: [137]
});

const wallets = [injected, walletConnect];

const chains = [
	{
		id: 137,
		token: 'MATIC',
		label: 'Polygon Mainnet',
		rpcUrl: 'https://polygon-rpc.com'
	}
];

const appMetadata = {
	name: 'Demo',
	icon: '<svg />',
	logo: '<svg />',
	description: 'Demo for blocknative',
	recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }]
};
let onboard;

if (!onboard) {
	onboard = Onboard({
		wallets,
		chains,
		appMetadata,
		accountCenter: {
			desktop: { enabled: true },
			mobile: { enabled: true }
		},
		connect: {
			autoConnectLastWallet: true
		}
	});
}

export default onboard as OnboardAPI;
