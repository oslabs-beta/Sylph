<script>
    import {Attributes} from './Attributes';
    import {Styles} from './Styles'
    import SelectDropdown from './SelectDropdown.svelte'
    import {activeNode, editorBody, nodeStore as nodes} from '../stores/store'
import { bind, each } from 'svelte/internal'
    // const styles = [ 'height', 'width', 'background-color', 'color',
    // 'font-size','font-weight','padding', 'margin', 'display']
    const attributes = Attributes.general
    // const attributes = ['alt','href', 'lang', 'name','src','title', 'value']
    let attributeForm
    let styleForm
    let IDField
     
    
    console.log('IDFIELD ',IDField)
    // let IDBody = 'block'
    const handleSubmit = ()=>{
        //   if( IDField.value.length>0 ){ 
        //       $editorBody = 'block'  
              
        //   } else {
        //     $editorBody = 'none'
            
        //   }
       attributeForm.reset()
       styleForm.reset()
       $nodes = {...$nodes};
       $activeNode = null
       console.log($activeNode)
    // activeNode.attributes.id ? $editorBody = 'block' : $editorBody = 'none'
    }
    // const handleStyleSubmit = ()=>{
    //    styleForm.reset()
    //    $nodes = {...$nodes};
    // }
    let available = false
</script>

    <container class='main-container'>
         
    <form on:submit|preventDefault={handleSubmit} bind:this ={attributeForm} class = attribute-form>
        <!-- static always on top of the list attributes -->
        {#if $activeNode?.name}
        <div class='table-header'>
           Element Attributes
        </div>
        <div class = "attribute-row">
            <div class = "editor-title">  
                <p>id: </p> 
            </div>
            <div class = "editor-input">  
                <input type="text" placeholder="***assign id to edit styles***" 
                value = {$activeNode?.attributes?.id || ''} 
                bind:this={IDField} on:input={(e)=>{
                     $activeNode.attributes.id = e.target.value}}/>
                <!-- <input type="text" placeholder="***assign id to edit styles***" value = '' bind:this={IDField} on:change={(e)=>IDField.value = e.target.value}/> -->
            </div>
        </div>

        <div class = "attribute-row">
            <div class = "editor-title">  
                <p>class: </p> 
            </div>
            <div class = "editor-input">  
                <input type="text" value = '' on:change={(e)=>$activeNode.attributes.class = e.target.value} disabled = {available}/>
            </div>
        </div>

        <div class = "attribute-row">
            <div class = "editor-title">  
                <p>innerText: </p> 
            </div>
            <div class = "editor-input">  
                <input type="text" value = '' on:change={(e)=>$activeNode.innerText = e.target.value}/>
            </div>
        </div>

        <!-- loop to dynamically populate editor fields -->
        {#each attributes as attribute }
        <div class = "attribute-row">
            <div class = "editor-title">  
                <p >{attribute}: </p> 
            </div>
          
            <div class = "editor-input">  
                <input type="text" value = {$activeNode?.attributes[attribute] || ''}
                  on:change={(e)=>$activeNode.attributes[attribute] = e.target.value}/>
            </div>
        </div>                            
              
        {/each}
        {:else}
        <div class='table-header'>
            Global Attributes
         </div>
         
         {#each attributes as attribute }
         <div class = "attribute-row">
             <div class = "editor-title">  
                 <p >{attribute}: </p> 
             </div>
             <div class = "editor-input">  
                 <input type="text" value = '' on:change={(e)=>$activeNode.attributes[{attribute}] = e.target.value}/>
             </div>
         </div>   
         {/each}
      {/if}
            <!-- <div>
                <button class = 'submit-btn' type='submit'>Apply Attributes</button>
            </div> -->
            </form >
   
            <form on:submit|preventDefault={handleSubmit} bind:this ={styleForm} class = style-form>
               <!-- <div style= 'display:{$editorBody}'> -->
        {#if IDField?.value.length>0 || $activeNode?.attributes?.id }
        <div class='table-header'>
            Styles
        </div>
        {#each Styles as style }   
        <div class = "attribute-row">
            <div class = "editor-title">  
                <p >{style}: </p> 
            </div>
            <div class = "editor-input">  
                <input type="text" value = '' on:change={(e)=> {
                    $activeNode.styles[style] = e.target.value;
                  }}
                />
            </div>
        </div> 
 
    {/each}
    {/if}

<div>
    <button class = 'submit-btn' type='submit'>Apply</button>
</div>
</form>
</container>
<div style= 'height: 150px'>

</div>
<style>

  .editor-input {
      display:grid;
      align-items: center;
      font-size:.6em;
      height:100%;
      width:100%;
      padding-left: 5px;
      margin:-5px;
      /* margin-bottom: -10px; */
  }
  .editor-title {
      display:grid;
      align-items: center;
      /* grid-template-columns: 1fr 2fr; */
      font-size:.6em;
      padding:-5px;
      margin:-5px;
      justify-items: start;
  }
.attribute-row {
    display:grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    border: 1px darkgray solid;
    padding:-2px;
    
    padding-top: 0;
    padding-bottom:0;
}
  .table-header {
      display:flex;
      padding: 10px;
      justify-content: center;
      outline:1px solid darkgray;
      width: auto;
      background-color: #7D3780;
      color: whitesmoke;
  }

  .attribute-form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
  }
  .submit-btn {
      margin: 10px;
  }
  .main-container {
      width: 100%;
      height:100%;
      margin: 0;
      padding: 0;
  }
  p{
      padding-left: 10px;
  }
  input {
      border-radius: 0;
      /* border:none; */
      outline:2px darkgray solid;
  }

  .editor-input input {
      width: auto;
  }

  
</style>
