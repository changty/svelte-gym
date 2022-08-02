<script>
import Auth from './Auth.svelte'; 
import {user} from './stores';

import Workouts from './Workouts.svelte';
import Workout from './Workout.svelte'; 

import Router, {link} from 'svelte-spa-router'; 


</script>

<main>
	<Auth />

	{#if $user.loggedIn}
		<Router routes = {{
			'/': Workouts,
			'/workout/:id': Workout,
		}} />
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>