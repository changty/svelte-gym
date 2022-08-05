<script>
import { onMount } from 'svelte'; 
import { db } from './Firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import Exercise from './Exercise.svelte'; 

export let params; 
let workout = {
    name: '', 
    description: '', 
    exercises: [],
}

let previousWorkout = {
    name: '',
    description: '',
    exercises: []
}; 

let edit = false; 

const toggleEdit = () => {
    edit = !edit; 
}

$:editLabel = edit ? 'done' : 'edit'; 

onMount( async () => {
    const snap = await getDoc(doc(db, 'workouts', params.id)); 

    if(snap.exists()) {
        workout = snap.data(); 
    }
    else {
        console.log("Error fetching workout:", params); 
    }

    if(workout.template != null && workout.template != '') {
        const previousSnap = await getDoc(doc(db, 'workouts', workout.template)); 
        if(previousSnap.exists()) {
            previousWorkout = previousSnap.data(); 

            // update workout so layout updates... ugly 
            workout = snap.data(); 
        }
        else {
            console.log("no previous workout");
        }

    }
});

const getPreviousExercise = (current) => {
    if(previousWorkout != null) {
        let res = previousWorkout.exercises.filter(exercise => exercise.name == current.name); 
        
        if(res.length > 0) {
            return res[0]; 
        }
        else{
            return {
                name: '',
                notes: '',
                sets: []
            }; 
        }
    }
}

const update = async (e) => {
    const docRef = doc(db, 'workouts', params.id);
    await updateDoc(docRef, {...workout }); 

    // forces update on exercises (volume)
    // workout = {...workout};

    console.log("updating"); 
}

const addNewExercise = () => {
    let newExercise  = {
        name: '',
        notes: '',
        sets: []
    }; 

    console.log(workout.exercises); 
    workout.exercises = [...workout.exercises, newExercise]
    console.log("adds new exercise", workout.exercises); 
}

const remove = (e) => {
    let exercise = e.detail; 
    workout.exercises = workout.exercises.filter(e => e.name != exercise.name); 
    update(); 
}

</script>

{#if edit}
<input bind:value={workout.name} on:change={update}/>
<textarea bind:value={workout.description} on:change={update}></textarea>

{:else}
    <h2 style="text-align:left">{workout.name}</h2>
    <p style="white-space: pre-line; text-align:left">{workout.description}</p>
{/if}
<div class="edit" on:click={toggleEdit}>{editLabel}</div>

{#each workout.exercises as exercise, i} 
    <Exercise on:updateExercise={update} on:remove={remove} {exercise} previousExercise = {getPreviousExercise(exercise)} active={i==0}/>
{/each}

<button class="add-new" on:click={addNewExercise}>Add new exercise</button>


<style>
input {
    width: 100%; 
}

textarea {
    width: 100%; 
}


</style>