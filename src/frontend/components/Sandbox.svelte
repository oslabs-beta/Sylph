<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from 'svelte-dnd-action';
  import {activeNode} from '../stores/store'

    export let nodes
    export let node
    export let depth
    export let activeItem
	
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
      let deleteIdx = -1;
      for (let i = 0; i < node.items.length; i++) {
        if (node.items[i].id === e.detail.info.id) {
          deleteIdx = i;
        }
      }
      //delete from node items (visible nodes)
      node.items = e.detail.items.filter((_, idx) => idx !== deleteIdx);
      //delete from nodes object
      delete nodes[e.detail.info.id];
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
		padding: 0.2em;
    width: 80%;
		border: 1px solid blue;
    box-sizing: border-box;
  }
  .active {
    background:crimson;
    color:white;
    border:darkmagenta solid 2px;
  }
</style>

{node.name}
{#if node.hasOwnProperty("items")}
	<section use:dndzone={{items:node.items, flipDurationMs}}

					 on:consider={handleDndConsider} 
					 on:finalize={handleDndFinalize}>
		{#if depth>0}
       <!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
			{#each node.items.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
				
				<div
        on:click|stopPropagation = {(e) => {
          item.fakeAttribute = 'blah';
          item.selected = !item.selected
          console.log(item);
          $activeNode = item
          console.log('ACTIVE NODE ',$activeNode)
          active[item.id] = !active[item.id];
          activeItem = {id: item.id, name: item.name}
          console.log('ITEM IN EACH' ,item, 'ACTIVE ID ', active[item.id]);
          console.log('active' ,activeItem);
          }} 
          on:keydown|stopPropagation = {(e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
              console.log(item.id);
              let deleteIdx = -1;
              for (let i = 0; i < node.items.length; i++) {
                if (node.items[i].id === item.id) {
                  deleteIdx = i;
                }
              }
              //delete from node items (visible nodes)
              node.items = node.items.filter((_, idx) => idx !== deleteIdx);
              //delete from nodes object
              delete nodes[item.id];
            }
          }}
          animate:flip="{{duration: flipDurationMs}}" 
          class="item"
          class:active={active[item.id]}
        >
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

<!-- class:active = {active} 
          on:click= {()=> active = !active} -->