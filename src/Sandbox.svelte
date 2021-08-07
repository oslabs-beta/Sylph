<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
    export let items;
    const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<style>
	section {
    display: flex;
    flex-direction: column;
    align-items: center;
		width: 100%;
    height: 100%;
		padding: 0.3em;
		border: 1px solid black;
		overflow: scroll;
    text-align: center;
	}

	div {
		width: 80%;
		padding: 0.2em;
		border: 1px solid blue;
		margin: 0.15em 0;
	}
</style>

<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each items as item(item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{item.name}	
		</div>
	{/each}
</section>