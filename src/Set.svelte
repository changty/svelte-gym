<script>
    import { createEventDispatcher } from 'svelte'; 

    const dispatch = createEventDispatcher(); 

    export let previousSet = {
        reps: 0,
        weight: 0
    }; 
    export let set = {
        index: 0, 
        reps: 0, 
        rest: 60,
        weight: 0
    }

    const index = set.index+1; 

    const updateReps = (e) => {
        dispatch('updateSet', set);
    }

    const updateWeights = (e) => {
        dispatch('updateSet', set); 
    }

    $: formattedPrevious = previousSet != null ? `${previousSet.reps} x ${previousSet.weight}` : '-'; 

    $: isBetter = set.reps*set.weight >= previousSet.reps*previousSet.weight; 


</script>

<div class="set">
    <div class="item {isBetter ? 'green' : ''}">
        {#if index == 1}
          <span>Set </span>
        {/if}
        {index}
    </div>
    <div class="item">
        {#if index == 1}
            <span>Previous</span>
        {/if}
        {formattedPrevious}
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

.item.green {
    background: #7adec4; 
    color: #121212!important;
}
input {
    display:block;
    color:inherit;
    text-align:center;
    border: 0px; 
    background: none; 
    padding: 0; 
    margin:0;
    width:60px;
    font-size: 16px; 
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
    margin-bottom: .4rem; 
    text-align:center; 
    background: #11141b;;
    flex-grow: 1; 
}

.item span {
    font-size: 0.8rem; 
    display:block; 
    width: 100%; 
    text-align:center;
    position: absolute; 
    top: -65%; 
    left: 0; 
    opacity: .4; 
}

</style>