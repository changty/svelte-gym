<script>
import { push } from 'svelte-spa-router'
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from './Firebase'; 

import { createEventDispatcher } from 'svelte'; 

const dispatch = createEventDispatcher(); 

export let workout; 

let date = new Date(workout.createdAt).toLocaleDateString(
  'en-gb',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
// let since = new Intl.RelativeTimeFormat().format(workout.createdAt);

$: totalCurrent = workout.exercises.reduce((previous, current) => {
    return previous + current.sets.reduce((total, current) => {
        return total + (Number(current.reps)*Number(current.weight));
    }, 0);
}, 0);

const open = () => {
   push('/workout/'+workout.id);
}; 

const copy = async () => {
  console.log(workout.id, workout); 
  let newWorkout = {...workout, template: workout.id};
  delete newWorkout.id; 
  newWorkout.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      set.weight = 0; 
      set.reps = 0; 
    })
  });
  console.log(newWorkout); 
  
  dispatch('copyNew', newWorkout); 
}

</script>
<div class="workout">
    <h2>{workout.name}</h2>
    Total: {totalCurrent}<br/>
    Date: {date}<br/>
    <!-- Since: {since} -->

    <div class="button-row">
      <button class="btn" on:click={open}>Open</button>
      <button class="link" on:click={copy}>Copy as a new workout</button>
    </div>

</div>

<style>

</style>