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
            <button class="btn top-button" on:click={goBack}>Back</button>
        {/if}
            <p>{$user.name}</p>
			<button class="top-button" on:click={logout}>Logout</button>
    {:else}
        <button on:click={loginWithGoogle} class="btn btn-outline-dark login-button" style="text-transform:none">
            Login with Google
        </button>
    {/if}
</nav>

<style>

    nav {
        position:absolute; 
        top: 0; 
        left:0; 
        right: 0; 
        text-align:center; 
        width: 100%; 
        display:flex; 
        flex-direction: row; 
        flex-wrap: nowrap; 
        align-content: space-between;
        justify-content: center;
        background: rgb(28, 26, 30);
        padding: .5rem .5rem; 

    }
    nav button {
        margin: 0; 
        flex-grow: 0;
    }
    nav p {
        flex-grow: 1; 
    }


    .top-button {
        background: #0e1219;

    }
</style>

