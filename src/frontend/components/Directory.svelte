<script lang="ts">
  import TreeView from './TreeView.svelte'

  let tree: object;
  const handleClick = async ()=> {
    globalThis.api.project.send('getDirectory')
    
    await globalThis.api.project.receive('directorySent', dir=>tree = dir);
    console.log('tree', tree)
    }

    const displayDirectory = (directory: object | string[]):string=>{
      const dir = Object.entries(directory);
      return `      
        <li>${dir[0][0]}
          <ul>
            ${dir[0][1].map(value=>{
              if(typeof value === 'object'){
                return displayDirectory(value);
              }else{
                return `<li>
                  ${value.slice(value.lastIndexOf('/'))}
                 </li>`
              }
            }).join('')}
          </ul>
        </li>      
      `
    }
</script>

<div>
  <button on:click={handleClick}>log dir</button>
  <!-- <ul>
    {@html tree?  displayDirectory(tree) : ''}
  </ul> -->
  {#if tree}
  <TreeView {tree}/>
  {/if}
</div>

<style>
*{
  text-align: left;
}
</style>