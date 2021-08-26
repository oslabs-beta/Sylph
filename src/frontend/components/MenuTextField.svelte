<script>
    import SelectDropdown from './SelectDropdown.svelte'
    import {activeNode} from '../stores/store'
    const styles = [ 'height', 'width', 'background-color', 'color',
    'font-size','font-weight', 'display', 'padding', 'margin']
    let attributeForm
    const handleSubmit = ()=>{
       attributeForm.reset()
    }
</script>
<form on:submit|preventDefault={handleSubmit} bind:this ={attributeForm} class = attribute-form>
    <div>
        <button class = 'submit-btn' type='submit'>Apply Changes</button>
      </div>
    <table>
        
        <tbody>
            <tr class='table-header'>
                <th>
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
                            <input type="text" value = '' on:change={(e)=>$activeNode.id = e.target.value}/>
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
                                <input type="text" value = '' on:change={(e)=>$activeNode.class = e.target.value}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class = "editor-input">  
                                <p>innerHTML: </p> 
                            </td>
                            <td>
                                <div class = "editor-input">  
                                    <input type="text" value = '' on:change={(e)=>$activeNode.innerHTML = e.target.value}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tr class=table-header>
                        <th >
                            Styles
                        </th>
                    </tr>
                    <tr >
                        <td class = "editor-input">
                            <p>
                                display :
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
                          
                        </tr>
        {#each styles as style }   
        <tr>
       
    <td>
        <div class = "editor-input">  
            <p>{style}: </p> 
        </td>
        <td>
            <div class = "editor-input">  
                <input type="text" value = '' on:change={(e)=>$activeNode.styles[style] = e.target.value}/>
            </div>
        </td>
     
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
  .table-header {
      display:flex;
      padding: 10px;
      justify-content: center;
      outline:1px solid black;
      width: auto;
      background-color: #7D3780;
      color: whitesmoke;
  }
  /* tbody {
      border: 1px solid black;
  } */
  .dropdown {
    display: grid;
    justify-content: center;
  }
  .attribute-form {
      display: flex;
      flex-direction: column;
  }
  .submit-btn {
      margin: 10px;
  }
</style>
