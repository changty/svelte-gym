<script>
    
import {onMount} from 'svelte';
import { workoutsDB, db } from './Firebase'; 
import { query, where, orderBy, getDocs, addDoc, collection } from 'firebase/firestore'; 
import { user } from './stores'; 
import Workout from './WorkoutCompact.svelte'; 



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

const copyNew = async (e) => {
   let newWorkout = e.detail

   const docRef = await addDoc(collection(db, 'workouts'), newWorkout); 
   newWorkout.id = docRef.id; 
   workouts = [newWorkout, ...workouts];
}


const addNewWorkout = async () => {
   let newWorkout = {
      name: 'New workout', 
      description: '', 
      exercises: [],
      owner: $user.email,
      template:'',
      createdAt: Date.now()
   }

   const docRef = await addDoc(collection(db, 'workouts'), newWorkout); 
   newWorkout.id = docRef.id; 
   workouts = [newWorkout, ...workouts];
}

$: getNextWorkout = () => {
   let uniques = []; 
   
   for(let i=0; i<workouts.length; i++) {
         let workout = workouts[i].name.trim().toLowerCase(); 
         
         if(!uniques.includes(workout)) {
            
            uniques.push(workout); 
         }
         else {
            break; 
         }
      
   }

   if(uniques.length == 0) {
      return null; 
   }
   console.log(uniques[uniques.length-1]);
   let next = workouts.find(w => w.name.trim().toLowerCase()  === uniques[uniques.length-1]); 
   return next; 
}

</script>
<button class="add-new" on:click={addNewWorkout}>Add new workout</button>

{#if getNextWorkout() != null}
<br><br>
<h4>Suggested next</h4>
   <div class="suggested">
      <Workout on:copyNew={copyNew} workout={getNextWorkout()}/>
   </div>
{/if}

{#each workouts as workout} 
   <Workout on:copyNew={copyNew} {workout} />
{/each}


<style>
.suggested {
   margin-bottom: 3rem; 
}


</style>