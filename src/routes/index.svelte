<script lang="ts">
	import OpenLogin from '@toruslabs/openlogin';

	let loggedIn = false;
	let err: unknown;

	async function handleOnLogin() {
		try {
			const openLogin = new OpenLogin({
				clientId:
					'BBF4Nl3tlqq6mtMWaLkTQjaCEkH-IvumU2Ywe17BUZ31dz73BQZwUIVASZ3ccpkAvT9eqMuFoWaRUVSFl4WcLL8',
				network: 'mainnet',
				uxMode: 'popup'
			});
			await openLogin.init();

			if (openLogin.privKey) {
				await openLogin.logout();
			}

			await openLogin.login();

			console.log(openLogin.privKey);

			loggedIn = true;
		} catch (error) {
			err = error;

			loggedIn = false;
		}
	}

	async function handleOnLogOut() {
		loggedIn = false;
	}
</script>

<h1>Torus</h1>
{#if loggedIn}
	<button type="button" on:click={handleOnLogOut}>Logout</button>
{:else}
	<button type="button" on:click={handleOnLogin}>Login</button>
{/if}
{#if !!err}
	<pre>
		{JSON.stringify(err)}
	</pre>
{/if}
