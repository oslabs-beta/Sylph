<script lang="ts">
  import { sandboxTree } from './sandboxStore';
	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
    export let items;
    const flipDurationMs = 300;
  
  //drag n drop functions for regular nodes
	function handleDndConsider(e) {
		items = e.detail.items;
	}

	function handleDndFinalize(e) {
    const itemID = e.detail.info.id;
    //delete item from sandbox if dropped outside
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
      let deleteIdx = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemID) {
          deleteIdx = i;
        }
      }
      items = e.detail.items.filter((elem) => elem.id !== itemID);
      // items = e.detail.items.filter((_, idx) => idx !== deleteIdx);
    } else {
      items = e.detail.items;
    }
  }

  //drag n drop functions for children
  function handleDndConsiderChild(iid, e) {
    //find matching item ID in items array
    for (let i = 0; i < items.length; i++) {
      //insert node into children
      if (items[i].id === iid) {
          items[i].children = e.detail.items;
        }
    }
    items = [...items];
  }

  function handleDndFinalizeChild(iid, e) {
    const itemID = e.detail.info.id;
    //delete item from sandbox if dropped outside
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
        //find matching item ID in items array
        for (let i = 0; i < items.length; i++) {
        //remove node from children
        if (items[i].id === iid) {
          items[i].children = e.detail.items.filter((elem) => elem.id !== itemID);
        }
      }
    } else {
      //find matching item ID in items array
      for (let i = 0; i < items.length; i++) {
        //insert node into children
        if (items[i].id === iid) {
          items[i].children = e.detail.items;
        }
      }
      items = [...items];
    }
  }

  //Tree Node class & methods for sandbox tree state
  class TreeNode {
    value: any;
    children: any;
    parent: any;
    constructor(value) {
      this.value = value;
      this.children = [];
      this.parent = null;
    }

    setParentNode = function(node) {
      this.parent = node;
    }

    getParentNode = function() {
        return this.parent;
    }

    addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }

    removeChild = function(node) {
      const removeIdx = this.children.indexOf(node);
      this.children.splice(removeIdx, 1);
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
State: {(console.log($sandboxTree))}

<section 
  use:dndzone={{items, flipDurationMs}} 
  on:consider={handleDndConsider} 
  on:finalize={handleDndFinalize}
>
  {#each items as item(item.id)}
    <div animate:flip="{{duration: flipDurationMs}}">
      {item.name}
      {#if item.hasOwnProperty('children')}
        <section 
          use:dndzone={{items:item.children, flipDurationMs}} 
          on:consider={(e) => handleDndConsiderChild(item.id, e)} 
          on:finalize={(e) => handleDndFinalizeChild(item.id, e)}
        >
          {#each item.children as child(child.id)}
            <div animate:flip="{{duration: flipDurationMs}}">
              {child.name}
            </div>
          {/each}
        </section>
      {/if}
    </div>
	{/each}
</section>