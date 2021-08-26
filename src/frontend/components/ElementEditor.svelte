<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script>
import { DivElement, ImageElement } from "../classes/HTMLElements.ts";
import MenuTextField from "./MenuTextField.svelte";
import SelectDropdown from "./SelectDropdown.svelte";
import {nodeStore as nodes, activeNode}  from '../stores/store'
console.log('OBJECT ENTRIES NODES ', Object.entries($nodes))
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




    </style>
    
    <!-- bind:value={}  -->
   
    <!-- <CollapseMenu entry ={attPair}/> -->
    <div class = 'content'>
<div>
  <h3>active node</h3>
 {JSON.stringify($activeNode)}
  <!-- <h3>node 1 HTML</h3>
  { JSON.stringify($nodes.node1)} -->
  <h3>node tree</h3>
  { JSON.stringify($nodes)}

</div>   
    <MenuTextField /> 
</div>
      
     
   