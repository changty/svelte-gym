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

onMount( async () => {
    const snap = await getDoc(doc(db, 'workouts', params.id)); 

    if(snap.exists()) {
        workout = snap.data(); 
    }
    else {
        console.log("Error fetching workout:", params); 
    }
});

const update = async (e) => {
    console.log("updating", params.id);

    const docRef = doc(db, 'workouts', params.id);
    await updateDoc(docRef, {...workout }); 

    console.log(workout); 

}

</script>

<h2>{workout.name}</h2>
<p>{workout.description}</p>
{#each workout.exercises as exercise} 
    <Exercise on:updateExercise={update} {exercise}/>
{/each}


<style>

</style>