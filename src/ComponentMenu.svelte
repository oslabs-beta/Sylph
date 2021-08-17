<script>
  import { flip } from 'svelte/animate';
  import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
  export let items;
  export let componentList; //list of components used to replenish menu after dragging
  const flipDurationMs = 300;
  // let shouldIgnoreDndEvents = false;
  let dropFromOthersDisabled = true;

  function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
    items = e.detail.items;
  }
</script>

<style>
	section {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
		width: 100%;
    height: 100%;
		padding: 0.3em;
	  overflow: auto;
	}
  
	div {
    box-sizing: border-box;
		width: 80%;
    padding: 0.2em;
		border: 1px solid blue;
		margin: 0.15em 0;
	}
</style>

<section 
  use:dndzone={{items, flipDurationMs, dropFromOthersDisabled }} 
  on:consider={handleDndConsider} 
  on:finalize={handleDndFinalize}
>
  {#each items as item(item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{item.name}	
		</div>
	{/each}
</section>
