<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from 'svelte-dnd-action';
  import {activeNode} from '../stores/store'

    export let nodes
    export let node
    export let depth
    
	
    // make a node Iterface
    // interface node<T> {
    //   id: string | number
    //   fakeAttribute: string | number
    // }

	const flipDurationMs = 300;

	function handleDndConsider(e:any) {
		node.items = e.detail.items;
	}

	function handleDndFinalize(e:any) {
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
      let deleteIdx = node.items.map((e) => e.id).indexOf(e.detail.info.id);
      //filter from node items
      node.items = e.detail.items.filter((_, idx) => idx !== deleteIdx);
      nodes = {...nodes}
    } else {
      node.items = e.detail.items;
		  nodes = {...nodes};
    }
	}
  let active = {}
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
    background-color: #c1c8e4;	
		padding: 0.2em;
    width: 80%;
		border: 1px solid blue;
    box-sizing: border-box;
  }
  .active {
    background: darkmagenta;
    color:white;
    border:darkmagenta solid 2px;
  }
</style>

{node.name}
{#if node.hasOwnProperty("items")}
	<section use:dndzone={{items:node.items, flipDurationMs}}
					 on:consider={handleDndConsider} 
					 on:finalize={handleDndFinalize}
           on:click = {()=> $activeNode = null}
  >
		{#if depth>0}
       <!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
			{#each node.items.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
				
				<div
        on:click|stopPropagation = {(e) => {
          $activeNode = null;
          $activeNode = item;
          item.selected = (item === $activeNode && true)
          active[item.id] = !active[item.id];      
          }} 
     
          on:keydown|stopPropagation = {(e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
              let deleteIdx = node.items.map((e) => e.id).indexOf(item.id);
              //filter from node items
              node.items = node.items.filter((_, idx) => idx !== deleteIdx);
              nodes = {...nodes}
            }
          }}
          animate:flip="{{duration: flipDurationMs}}" 
            class="item"
            class:active={item === $activeNode && item.selected}
          >
     
        <svelte:self 
          bind:nodes={nodes} 
          node={node.items[node.items.map((e) => e.id).indexOf(item.id)]} 
          depth={depth-1}
        />
        </div>
      	
			{/each}
		{/if}
	</section>
{/if}

