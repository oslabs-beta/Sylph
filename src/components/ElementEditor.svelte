<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script>
import { bind, destroy_block } from "svelte/internal";
import { DivElement, ImageElement } from "../classes/HTMLElements.ts";
import CollapseMenu from "./CollapseMenu.svelte"; 
import MenuTextField from "./MenuTextField.svelte";
import SelectDropdown from "./SelectDropdown.svelte";
    const testDiv = new DivElement
    const testImage = new ImageElement
    console.log('TESTDIV', testDiv)
    </script>
    
    <style>
      .content {
        display: grid;
        /* grid-template-columns: 40% 60%; */
        width: 90%;
        height: 100%;
        justify-content: center;
      }
      .drop {
        justify-content: center;
        width: 80%;
      }
      .editor-input {
          display:grid;
          font-size:.6em;
          grid-template-columns: 40% 60%;
          grid-column-gap: 10px;
          align-items: center;
          border: 1px solid black;
          border-radius: 5px;
          justify-content: center;
          width: 100%;

      }
      .edit-container {
        padding:10px;
      }
      ul {
          list-style: none;
      }
      hr {
        width: 'auto';
      }
      /* .card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
} */
    </style>
    
    <!-- bind:value={}  -->
   
    <!-- <CollapseMenu entry ={attPair}/> -->
    <div class = 'content'>

    <table>
      {#each Object.entries(testDiv.attributes.classId) as pairs} 
      <tr>
       
        <MenuTextField itemPair ={pairs}/>
      
      </tr>
      {/each}
      <tr>
        <td>
          <hr>
        </td>
      </tr>
      {#each Object.entries(testDiv.attributes.general) as pairs} 
      <tr>
        {#if pairs[0] === 'display'}
        <SelectDropdown 
       
        value = {pairs} 
        items ={[
          {value:'block', label:'block'},
          {value:'inline-block', label:'inline-block'},
          {value:'flex', label:'flex'},
          {value:'grid', label:'grid'},
        ]}/>
        {:else}
        <MenuTextField itemPair ={pairs}/>
        {/if}
      </tr>
      {/each}
</table>
  </div>

   