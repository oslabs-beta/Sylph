<script>
    import SelectDropdown from './SelectDropdown.svelte'
    import {activeNode} from '../stores/store'
    let attributes = ['id','class', 'height', 'width', 'background-color', 'color','text',
    'font-size','font-weight', 'display', 'padding', 'margin']
    const handleSubmit = ()=>{

    }
</script>
<form on:submit|preventDefault={handleSubmit}>
    <div>
        <button type='submit'>Apply Changes</button>
      </div>
    <table>
        
        {#each attributes as attribute }   
        <tr>
            {#if attribute === 'display'}
            <SelectDropdown 
            
            value = {attribute} 
            items ={[
                {value:'block', label:'block'},
                {value:'inline-block', label:'inline-block'},
                {value:'flex', label:'flex'},
                {value:'grid', label:'grid'},
            ]}/>
    {:else}
    <td>
        <div class = "editor-input">  
            <p>{attribute}: </p> 
        </td>
        <td>
            <div class = "editor-input">  
                <input type="text" value = '' on:change={(e)=>$activeNode[attribute] = e.target.value}/>
            </div>
        </td>
        {/if}
    </tr>
    {/each}
</table>
</form>
<!-- <td>
    <div class = "editor-input">  
    <p>{itemPair[0]}: </p> 
</td>
   <td>
       <div class = "editor-input">  
           <input type="text" bind:value={itemPair[1]}
           />
        </div>
    </td> -->

<style>
       
   
        
      
      .editor-input {
          display:grid;
          font-size:.6em;
          /* grid-template-columns: 40% 60%; */
          /* grid-column-gap: 10px; */
          /* align-items: center; */
          border-radius: 5px;
          /* justify-content: center; */
          width: 100%;
          padding:10px;
      }
  
      ul {
          list-style: none;
      }
    </style>
