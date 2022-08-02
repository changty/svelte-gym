<script>
import Set from './Set.svelte'; 
import { createEventDispatcher } from 'svelte'; 

const dispatch = createEventDispatcher(); 

export let exercise  = {
    name: '',
    notes: '',
    sets: []
}; 

const update = (e) => {

    // console.log(data.detail); 
    console.log(exercise.sets); 
//     exercise.sets = exercise.sets.splice(data.detail.index, 1, data.detail); 
//     console.log(exercise.sets); 
    dispatch('updateExercise', exercise); 
}

</script>

<div class="exercise">
    <h2>{ exercise.name } </h2>
    <p class="notes">{ exercise.notes}</p>
    <br/><br/>
    {#each exercise.sets as set}
        <Set on:updateSet={update} {set}/>
    {/each}
    
</div>
<style>
.exercise {
    padding: 1rem 1rem; 
}

h2 {
    font-size: 1rem; 
}
.notes {
    font-size: .9rem; 
}
</style>