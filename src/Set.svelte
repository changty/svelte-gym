<script>
    import { createEventDispatcher } from 'svelte'; 

    const dispatch = createEventDispatcher(); 

    export let set = {
        index: 0, 
        reps: 0, 
        rest: 60,
        weight: 0
    }

    const index = set.index+1; 

    const updateReps = (e) => {
        console.log("reps", set.reps)
        dispatch('updateSet', set);
    }

    const updateWeights = (e) => {
        console.log("weights", set.weight)
        dispatch('updateSet', set); 
    }

</script>

<div class="set">
    <div class="item">
        {#if index == 1}
          <span>Set </span>
        {/if}
        {index}
    </div>
    <div class="item">
        {#if index == 1}
            <span>Previous</span>
        {/if}
        10x10
    </div>
    <div class="item">
        {#if index == 1}
            <span>Reps</span>
        {/if}
        <input on:change={updateReps} bind:value={set.reps}>
        
    </div>
    <div class="item">
        {#if index == 1}
            <span>Weight</span>  
        {/if}
        <input  on:change={updateWeights} bind:value={set.weight}>
    </div>

</div>

<style>

input {
    display:block;
    color:inherit;
    text-align:center;
    border: 0px; 
    background: none; 
    padding: 0; 
    margin:0;
    width:90px;
}
input:active {
    border:0; 
    outline:none;
}

.set {
    display: flex; 
    flex-direction: row;
    flex-wrap: nowrap;
}

.item {
    position:relative; 
    font-size: 0.8em; 
    padding: .5rem .75rem; 
    border-radius: 5px;
    margin: .2rem;
    margin-bottom: 1rem; 
    text-align:center; 
    background: #1a1e29;
    flex-grow: 1; 
}

.item span {
    font-size: 0.8rem; 
    display:block; 
    width: 100%; 
    text-align:center;
    position: absolute; 
    top: -70%; 
    left: 0; 
}

</style>