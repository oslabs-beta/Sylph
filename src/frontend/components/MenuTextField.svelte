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
          
            <table >
                
                
                <tbody  >
                    <tr class='table-header' >
                        <th >
                                Attributes
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <div class = "editor-input">  
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
                        <div class = "editor-input">  
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
                            <div class = "editor-input">  
                                <p>innerText: </p> 
                             
                            </td>
                            <td>
                                <div class = "editor-input">  
                                    <input type="text" value = '' on:change={(e)=>$activeNode.innerText = e.target.value}/>
                                </div>
                            </td>
                        </tr>
                        {#each attributes as attribute }
                            
                        <tr>
                            <td>
                                <div class = "editor-input">  
                                    <p >{attribute}: </p> 
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
              
                
            <tbody >  
                    <tr class=table-header>
                        <th colspan='2'>
                            Styles
                        </th>
                    </tr>
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
        <div class = "editor-input">  
            <p>{style}: </p> 
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
      font-size:.6em;
   
      border-radius: 5px;
      width: 100%;
      padding:10px;
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
  }
  .submit-btn {
      margin: 10px;
  }
  .main-container {
      height: 100%;
      margin: 10px;
  }
  
</style>
