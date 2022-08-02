<script>
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
</script>
<div class="workout">
    <h2>{workout.name}</h2>
    Total: {totalCurrent}<br/>
    Date: {date}<br/>
    <!-- Since: {since} -->

</div>

<style>

</style>