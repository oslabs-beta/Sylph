<script>
    import SelectDropdown from './SelectDropdown.svelte'
    import {activeNode, editorBody, IDBody, nodeStore as nodes} from '../stores/store'
import { bind, each } from 'svelte/internal'
    const styles = [ 'height', 'width', 'background-color', 'color',
    'font-size','font-weight','padding', 'margin', 'display']
    const attributes = ['alt','href', 'lang', 'name','src','title', 'value']
    let attributeForm
    let styleForm
    let IDField
    // let IDBody = 'block'
    const handleSubmit = ()=>{
          if( IDField.value.length>0 ){ 
              $editorBody = 'block'  
              $IDBody = 'none'
          } else {
            $editorBody = 'none'
            $IDBody = 'block'
          }
       attributeForm.reset()
       $nodes = {...$nodes};
    // activeNode.attributes.id ? $editorBody = 'block' : $editorBody = 'none'
    }
    const handleStyleSubmit = ()=>{
       styleForm.reset()
       $nodes = {...$nodes};
    }
    let available = false
</script>

    <container class='main-container'>
    <form on:submit|preventDefault={handleSubmit} bind:this ={attributeForm} class = attribute-form>
        <div>
          
            <table class= 'attribute-table' >
                
                
                <tr class='table-header' >
                    <th >
                        Attributes
                    </th>
                </tr>
                <tbody  >
                    <tr>
                        <td>
                            <div class = "editor-title">  
                                <p>id: </p> 
                            </td>
                            <td>
                                <div class = "editor-input">  
                                    <input type="text" value = '' bind:this={IDField} on:change={(e)=>$activeNode.attributes.id = e.target.value}/>
                                </div>
                            </td>
                        </tr>
                   
                          
                <tr>
                    <td>
                        <div class = "editor-title">  
                            <p>class: </p> 
                        </td>
                        <td>
                            <div class = "editor-input">  
                                <input type="text" value = '' on:change={(e)=>$activeNode.attributes.class = e.target.value} disabled = {available}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class = "editor-title">  
                                <p>innerText: </p> 
                             
                            </td>
                            <td>
                                <div class = "editor-input">  
                                    <input type="text" value = '' on:change={(e)=>$activeNode.innerText = e.target.value}/>
                                </div>
                            </td>
                        </tr>
                        {#each attributes as attribute }
                            
                        <tr >
                            <td>
                                <div class = "editor-title">  
                                    <p >{attribute}: </p> 
                                    </div>
                                </td>
                                <td>
                                    <div class = "editor-input">  
                                        <input type="text" value = '' on:change={(e)=>$activeNode.attributes[{attribute}] = e.target.value}/>
                                    </div>
                                </td>
                            </tr>
                            {/each}
                </tbody >
            </table>
            </div>
            <div>
                <button class = 'submit-btn' type='submit'>Apply Attributes</button>
            </div>
            </form >
            <div style='display:{$IDBody}'>
                <p style= 'color:#ff0f0f; font-weight:700; font-size: 1em;' >Must assign  ID to customize styles</p>
            </div>
            <form on:submit|preventDefault={handleStyleSubmit} bind:this ={styleForm} class = style-form>
               <div style= 'display:{$editorBody}'>
                <table>
              
                
                    <tr class=table-header>
                        <th colspan='2'>
                            Styles
                        </th>
                    </tr>
                    <tbody >  
                    <!-- <tr >
                        <td class = "editor-input">
                            <p>
                                Display :
                            </p>
                        </td>
                        <td>

                            <SelectDropdown 
                            
                            value = 'select display ' 
                            items ={[
                                {value:'block', label:'block'},
                                {value:'inline-block', label:'inline-block'},
                                {value:'flex', label:'flex'},
                                {value:'grid', label:'grid'},
                            ]}/>
                            </td>
                          
                        </tr> -->
        {#each styles as style }   
        <tr>
       
    <td>
        <div class = "editor-title">  
            {style}: 
          </div>
        </td>
        <td>
            <div class = "editor-input">  
                <input 
                  type="text" 
                  value = '' 
                  on:change={(e)=> {
                    $activeNode.styles[style] = e.target.value;
                  }}
                />
            </div>
        </td>
     
    </tr>
    {/each}
</tbody>  
</table>
<div>
    <button class = 'submit-btn' type='submit'>Apply Styles</button>
</div>
</div>
</form>
</container>
<div style= 'height: 200px'>

</div>
<style>
  .editor-input {
      display:grid;
      grid-template-columns: 1fr 2fr;
      font-size:.6em;
      border-radius: 5px;
      height:100%;
      width:100%;
      padding-left: 5px;
      margin:-5px;
      justify-content: flex-start;
  }
  .editor-title {
      display:grid;
      grid-template-columns: 1fr 2fr;
      font-size:.6em;
      padding:-5px;
      margin:-5px;
      justify-items: end;
  }

  .table-header {
      display:flex;
      padding: 10px;
      justify-content: center;
      outline:1px solid black;
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
      height:auto;
      margin: 0;
  }
  p{
      padding-left: 10px;
  }
  tbody{
      display:grid;
      grid-template-columns: 1fr ;
  }
  tr {
    display:grid;
      grid-template-columns: 1fr 2fr;
  }
  td {
      display:flex;
      align-items: center;
  }
  .editor-input input {
      width: auto;
  }
  tr td   {
      
      border: 1px darkgray solid;
      width:100%;
      padding:1px;
      contain: content;
  }
  .attribute-table {
      display:grid;
      
  }
  
</style>
