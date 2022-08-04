<script>
import Set from './Set.svelte'; 
import { createEventDispatcher } from 'svelte'; 

const dispatch = createEventDispatcher(); 

export let previousExercise = {
    name: '',
    notes: '',
    sets: []
}; 

export let exercise  = {
    name: '',
    notes: '',
    sets: []
}; 

let edit = false; 

let active = false; 

const toggleEdit = () => {
    edit = !edit; 
}

$:editLabel = edit ? 'done' : 'edit'; 

const update = (e) => {
    // causes update on sets
    exercise.sets = [...exercise.sets];

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
    let res = previousExercise.sets.filter(set => set.index == current.index)
    if(res.length > 0) {
            return res[0]; 
    }
}

const remove = () => {
    dispatch('remove', exercise); 
}

$: totalCurrent = exercise.sets.reduce((previous, current) => {
        return previous + (current.reps*current.weight);
    }, 0);
 
    
$: totalPrevious = previousExercise.sets.reduce((previous, current) => {
    return previous + (current.reps*current.weight);
}, 0);

</script>

<div class="exercise" on:click|self={() =>  active = !active}>
    {#if edit}
        <input bind:value={exercise.name} on:change={update}/>
        <textarea bind:value={exercise.notes} on:change={update}></textarea>
        <div class="edit delete" on:click={remove}>Delete</div>
    {:else}
    <div class="header">
        <div class="info">
            <h2>{ exercise.name } </h2>
            <p class="notes">{ exercise.notes}</p>
        </div>
        <div class="volume">
            <p>Volume: <b class="{totalCurrent > totalPrevious ? 'green-txt' : ''}">{totalCurrent}</b> / {totalPrevious}</p>
        </div>

    </div>
    {/if}

    <div class="edit" on:click={toggleEdit}>{editLabel}</div>
    
    <div class="sets {active ? 'active' : ''}">
        {#each exercise.sets as set, i}
            <Set on:updateSet={update} {set} previousSet={getPreviousSet(set)}/>
        {/each}
    </div>

    <div class="button-row {active ? '' : 'hidden'}">
        <button class="btn link" on:click={removeSet}>Remove set</button>
        <button class="btn" on:click={addSet}>Add set</button>
    </div>
</div>
<style>
.header {
    display:flex; 
    flex-direction: row; 
    flex-wrap:nowrap; 
    justify-content: space-between;
}
.volume, .volume p {
    padding: 0; 
    margin:0; 
}
.hidden {
    display: none; 
}
.sets {
    display: none; 
    margin-top: 3rem;
}

.sets.active {
    display: block; 
}
input {
    width: 100%; 
}

textarea {
    width: 100%; 
}
.exercise {
    z-index: 1; 
    position:relative; 
    padding: 1rem 1rem; 
}

h2 {
    font-size: 1rem; 
}
p {
    font-size: .9rem; 
}

.delete {
    z-index: 2; 
    position: absolute; 
    right: 1rem; 
}
</style>