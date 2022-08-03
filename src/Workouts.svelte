<script>
    
import {onMount} from 'svelte';
import { workoutsDB } from './Firebase'; 
import { query, where, orderBy, getDocs } from 'firebase/firestore'; 
import { user } from './stores'; 
import Workout from './WorkoutCompact.svelte'; 
import { push } from 'svelte-spa-router'


let workouts = []; 

onMount(async () => {
   const q = query(workoutsDB, where('owner', '==', $user.email), orderBy('createdAt', 'desc')); 
   const querySnapshot = await getDocs(q); 

   let array = []; 
   querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id }); 
   }); 

   workouts = array; 
})

const openWorkout = (id) => {
   console.log("open workout: " + id); 
   push('/workout/'+id);
}

</script>

{#each workouts as workout} 
<div on:click = {() => openWorkout(workout.id)}>
   <Workout {workout} />

</div>
{/each}

<style>

</style>