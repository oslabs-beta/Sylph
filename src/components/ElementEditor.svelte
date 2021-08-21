<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script>
    import { bind } from "svelte/internal";
import { DivElement, ImageElement } from "../classes/HTMLElements.ts";
    const testDiv = new DivElement
    const testImage = new ImageElement
    console.log('TESTDIV ',testDiv)
    
    </script>
    
    <style>
      .content {
        display: grid;
        /* grid-template-columns: 40% 60%; */
        width: 90%;
        
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
    </style>
    
    <!-- bind:value={}  -->
    <ul>
  {#each Object.entries(testImage.attributes) as attPair}
  <li>
    <div class='edit-container'>
    <form class="content">
     <div class = "editor-input">  
      <label>{attPair[0]}: </label>
      <input type="text" bind:value={attPair[1]}
      />
    </div>
</li>
    {/each}
</ul>
    <!-- <div class='edit-container'>
    <form class="content">
     <div class = "editor-input">  
      <label>Class Name: </label>
      <input type="text" 
      />
    </div>
    <div class='editor-input'>
      <label>ID:</label>
      <input type="text" 
      />
    </div>
    <div class='editor-input'>
      <label>Display:</label>
      <select placeHolder = 'select display' name="display" list="display-type">
          
          <option value="block">block</option>
          <option value="inline block">inline block </option>
          <option value="flex"> flex </option>
          <option value="grid"> grid </option>
          
        </select>
    </div>
    <div class='editor-input'>
        <label>Height:</label>
        <input type="text" 
        />
    </div>
    <div class='editor-input'>
        <label>Width:</label>
        <input type="text" 
        />
    </div>
    <div class='editor-input'>
        <label>Text:</label>
        <input type="text" 
        />
    </div> -->

    <!-- </form>
    </div> -->
    <!-- <p> -->
        <!-- {JSON.stringify($user, 0, 2)}</p> -->
    
    