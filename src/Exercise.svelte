<script>
import Set from './Set.svelte'; 
import { createEventDispatcher } from 'svelte'; 

const dispatch = createEventDispatcher(); 

export let previousExercise = null; 

export let exercise  = {
    name: '',
    notes: '',
    sets: []
}; 

let edit = false; 

const toggleEdit = () => {
    edit = !edit; 
}

$:editLabel = edit ? 'done' : 'edit'; 

const update = (e) => {
    dispatch('updateExercise', exercise); 
}

const addSet = () => {
    exercise.sets = [...exercise.sets, {
        index: exercise.sets.length, 
        weight: 0, 
        reps: 0, 
        rest: 60
    }]
    dispatch('updateExercise', exercise); 
}

const removeSet = (e) => {
    exercise.sets = exercise.sets.slice(0, -1);
    dispatch('updateExercise', exercise); 

}

const getPreviousSet = (current) => {
    if(previousExercise != null) {
        let res = previousExercise.sets.filter(set => set.index == current.index)
        if(res.length > 0) {
            return res[0]; 
        }
    }
}

</script>

<div class="exercise">
    {#if edit}
        <input bind:value={exercise.name} on:change={update}/>
        <textarea bind:value={exercise.notes} on:change={update}></textarea>
    {:else}
        <h2>{ exercise.name } </h2>
        <p class="notes">{ exercise.notes}</p>
    {/if}

    <div class="edit" on:click={toggleEdit}>{editLabel}</div>
    <br/><br/>
    {#each exercise.sets as set, i}
        <Set on:updateSet={update} {set} previousSet={getPreviousSet(set)}/>
    {/each}

    <div class="button-row">
        <button class="btn link" on:click={removeSet}>Remove set</button>
        <button class="btn" on:click={addSet}>Add set</button>
    </div>
</div>
<style>

input {
    width: 100%; 
}

textarea {
    width: 100%; 
}
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