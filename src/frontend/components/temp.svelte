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