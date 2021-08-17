<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from 'svelte-dnd-action';
    export let nodes
    export let node
    export let depth
	
	const flipDurationMs = 300;
	function handleDndConsider(e) {
		node.items = e.detail.items;
		
	}
	function handleDndFinalize(e) {
    console.log('nodes', nodes);
		node.items = e.detail.items;
		nodes = {...nodes};
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

<b>{node.name}</b>
{#if node.hasOwnProperty("items")}
	<section use:dndzone={{items:node.items, flipDurationMs}}
					 on:consider={handleDndConsider} 
					 on:finalize={handleDndFinalize}>
		{#if depth>0}
       <!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
			{#each node.items.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
				<div animate:flip="{{duration: flipDurationMs}}" class="item">
					<svelte:self 
            bind:nodes={nodes} 
            node={nodes[item.id]} 
            depth={depth-1}
          />
				</div>
			{/each}
		{/if}
	</section>
{/if}