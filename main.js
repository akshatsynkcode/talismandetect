import { web3Enable, web3Accounts, isWeb3Injected } from 'https://cdn.jsdelivr.net/npm/@polkadot/extension-dapp@latest/+esm';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectButton').addEventListener('click', async () => {
        try {
            // Check if any Polkadot extension is injected
            if (!isWeb3Injected) {
                alert('No Polkadot extension detected. Please install Talisman Wallet.');
                window.open('https://chromewebstore.google.com/detail/talisman-ethereum-and-pol/fijngjgcjhjmmpcmkeiomlglpeiijkld', '_blank');
                return;
            }

            // Enable the extension and request access to accounts
            const extensions = await web3Enable('Talisman Wallet Demo');

            // Check if the Talisman extension is specifically available
            const talismanExtension = extensions.find(ext => ext.name.toLowerCase().includes('talisman'));
            if (!talismanExtension) {
                alert('Talisman wallet is installed but not configured for this site. Please open the wallet and grant permission to connect.');
                return;
            }

            // Retrieve all accounts the user has allowed access to
            const allAccounts = await web3Accounts();

            // Handle case where no accounts are found
            if (allAccounts.length === 0) {
                alert('Talisman wallet is installed but no accounts are configured. Please open the wallet and set up an account.');
                return;
            }

            // Use the first account as the logged-in account
            const account = allAccounts[0];
            console.log('Logged-in Account:', account);

            // Display the account address
            document.getElementById('accountInfo').style.display = 'block';
            document.getElementById('accountAddress').textContent = account.address;
        } catch (error) {
            console.error('Error fetching account:', error);
            alert('Error fetching account. Check the console for more details.');
        }
    });
});
