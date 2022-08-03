<script>
import { user } from './stores';
import { auth } from './Firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';  
import { onAuthStateChanged } from 'firebase/auth'; 
import { onMount } from 'svelte'; 
import { pop, location } from 'svelte-spa-router'



const emptyUser = {
    name: '',
    email: '',
    loggedIn: false
}

onMount(() => {
		onAuthStateChanged(auth, (googleUser) => {
            if(googleUser == null) {
                $user = emptyUser; 
            }            
            else {
                $user.name = googleUser.displayName;
                $user.email = googleUser.email;  
                $user.loggedIn = true; 
            }
		}),
		(error) => {
			$user = emptyUser; 
			console.log("Error on onAuthStateChanged: ", error); 
		}
	});

const logout = async () => {
		await signOut(auth); 
}

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
}

const goBack = () => {
    pop(); 
}

</script>

<nav>
    {#if $user.loggedIn} 
        {#if $location !== '/'}
            <button class="btn" on:click={goBack}>Back</button>
        {/if}
            <p>
                {$user.name}
            </p>
			<button on:click={logout}>Logout</button>
    {:else}
        <button on:click={loginWithGoogle} class="btn btn-outline-dark login-button" style="text-transform:none">
            <img style="width: 35px; margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
        </button>
    {/if}
</nav>

<style>

    nav {
        text-align:center; 
        width: 100%; 
        display:flex; 
        flex-direction: row; 
        flex-wrap: nowrap; 
        align-content: space-between;
        justify-content: center;
    }

    nav p {
        flex-grow: 1; 
    }

</style>

