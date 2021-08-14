<script lang="ts">
  import { sandboxTree } from './sandboxStore';
	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
    export let items;
    const flipDurationMs = 300;
  
  //drag n drop functions for regular nodes
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
    } else {
      items = e.detail.items;
    }
  }

  //drag n drop functions for first level nested children
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

  //drag n drop functions for second level nested children
  function handleDndConsiderChild2(iid, e) {
    const itemID = e.detail.info.id;
    //delete item from sandbox if dropped outside
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
      //find matching item ID in items array
      for (let i = 0; i < items.length; i++) {
        if (items[i].children) {
          for (let j = 0; j < items[i].children.length; j++) {
            //remove node from children
            if (items[i].children[j].id === iid) {
              items[i].children[j].children = e.detail.items.filter((elem) => elem.id !== itemID);
            }
          }
        }
      }
    } else {
      //find matching item ID two levels down
      for (let i = 0; i < items.length; i++) {
        if (items[i].children) {
          for (let j = 0; j < items[i].children.length; j++) {
            if (items[i].children[j].id === iid) {
              //insert node into children
              items[i].children[j].children = e.detail.items;
            }
          } 
        }
      }
      items = [... items];
    }
  }

  function handleDndFinalizeChild2(iid, e) {
    const itemID = e.detail.info.id;
    //delete item from sandbox if dropped outside
    if (e.detail.info.trigger === TRIGGERS.DROPPED_OUTSIDE_OF_ANY) {
      //find matching item ID in items array
      for (let i = 0; i < items.length; i++) {
        if (items[i].children) {
          for (let j = 0; j < items[i].children.length; j++) {
            //remove node from children
            if (items[i].children[j].id === iid) {
              items[i].children[j].children = e.detail.items.filter((elem) => elem.id !== itemID);
            }
          }
        }
      }
    } else {
      //find matching item ID two levels down
      for (let i = 0; i < items.length; i++) {
        if (items[i].children) {
          for (let j = 0; j < items[i].children.length; j++) {
            if (items[i].children[j].id === iid) {
              //insert node into children
              items[i].children[j].children = e.detail.items;
            }
          } 
        }
      }
      items = [... items];
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
      {#if item.hasOwnProperty('children')}
        <section 
          use:dndzone={{items:item.children, flipDurationMs}} 
          on:consider={(e) => handleDndConsiderChild(item.id, e)} 
          on:finalize={(e) => handleDndFinalizeChild(item.id, e)}
        >
          {#each item.children as child(child.id)}
            <div animate:flip="{{duration: flipDurationMs}}">
              {child.name}
              {#if child.hasOwnProperty('children')}
                <section 
                  use:dndzone={{items:child.children, flipDurationMs}} 
                  on:consider={(e) => handleDndConsiderChild2(child.id, e)} 
                  on:finalize={(e) => handleDndFinalizeChild2(child.id, e)}
                >
                  {#each child.children as child2(child2.id)}
                    <div animate:flip="{{duration: flipDurationMs}}">
                      {child2.name}
                    </div>
                  {/each}
                </section>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
    </div>
	{/each}
</section>