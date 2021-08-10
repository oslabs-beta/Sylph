<script>
	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
    export let items;
    const flipDurationMs = 300;
  
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
      let deleteIdx = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === e.detail.info.id) {
          deleteIdx = i;
        }
      }
      items = e.detail.items.filter((_, idx) => idx !== deleteIdx);
    } else {
      items = e.detail.items;
    }
  }
</script>

<style>
	section {
    display: flex;
    flex-direction: column;
    align-items: center;
		width: 100%;
    height: 100%;
		overflow: auto;
    text-align: center;
    padding: 0.3em;
    box-sizing: border-box;
	}

	div {
    margin: 0.15em 0;	
		padding: 0.2em;
    width: 80%;
		border: 1px solid blue;
    box-sizing: border-box;
  }
</style>

<h3>Sandbox</h3>
<section 
  use:dndzone={{items, flipDurationMs}} 
  on:consider={handleDndConsider} 
  on:finalize={handleDndFinalize}
>
  {#each items as item(item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{item.name}	
		</div>
	{/each}
</section>