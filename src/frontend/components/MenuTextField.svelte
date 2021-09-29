<svelte:options immutable={true}/>
<script>
    import {activeNode,  nodeStore as nodes} from '../stores/store'
    import {searchFieldValue} from '../stores/store'
    import Textfield from '@smui/textfield';
    import App from '../App.svelte';
    import { tick } from 'svelte';
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import Select, {Option } from '@smui/select';
  import Icon from '@smui/select/icon';

    import {Attributes} from './Attributes';
    import {Styles} from './Styles'
    import {elements} from './elements'
 
    let active = 'ELEMENTS';
    let attributeForm;
    let styleForm;
    let IDField;
    let fieldDisabled = true
    let IDmsg;
    let value = '';
    let valueHelperText = '';
    let valueLeadingIcon = '';
    let valueInvalid = '';
        //dynamically adds element specific attributes to editor list
        const attributeList = () =>{
         switch ($activeNode?.name){
          case 'a':            
              return Attributes.general.concat(Attributes.a).sort();
                
          case 'blockquote':
              return Attributes.general.concat(Attributes.blockquote).sort();
               
          case 'button':
              return Attributes.general.concat(Attributes.button).sort();
                
          case 'form':
              return Attributes.general.concat(Attributes.form).sort();
                
          case 'img':
              return Attributes.general.concat(Attributes.img).sort();
                
          case 'li':
              return Attributes.general.concat(Attributes.li).sort();
                
          case 'ol':
              return Attributes.general.concat(Attributes.ol).sort();
                
          case 'textarea':
              return Attributes.general.concat(Attributes.textarea).sort();
              
          default:
              return Attributes.general  
        }
        return 
    }
    //array iterated to build editor list
    let attributes = [];
    //works like useEffect passing activenode.name into the dependency array
    $: $activeNode?.name ? attributes = attributeList() : attributes = Attributes.general 
    $: $activeNode?.attributes.id ? fieldDisabled = false : fieldDisabled = true, console.log('DISABLED', fieldDisabled)
    $: $activeNode?.attributes.id ? IDmsg = '' : IDmsg= '  *** Assign ID to edit ***', console.log('DISABLED', fieldDisabled)
    const handleSubmit = ()=>{
       $activeNode?.attributes.id ? fieldDisabled = false : fieldDisabled = true
       $nodes = {...$nodes};
    }

  </script>

    <container class='main-container'>
         
    <form on:submit|preventDefault={handleSubmit} 
    on:keydown={(e)=>{if(e.key === 'Enter') handleSubmit()}} 
    bind:this ={attributeForm} 
    class = attribute-form>
        <!-- static always on top of the list attributes -->
        {#if $activeNode?.name}
        <div class='table-header'>
           Element Attributes
        </div>
      
       <div class="attribute-row">
           <Textfield 
           bind:this={IDField}
           variant = 'filled'
           type= 'text'
           label= ID 
        value={$activeNode?.attributes?.id || ''} 
       on:input={(e)=>{
        $activeNode.attributes.id = e.target.value
        handleSubmit();
        }}
        placeholder="***assign id to edit styles***"
       />
    
     </div>

        <div class="attribute-row">
            <Textfield 
            variant = 'filled' 
            type= 'text'
            label= class 
            value={$activeNode?.attributes?.class || ''} 
           on:input={(e)=>{
            $activeNode.attributes.class = e.target.value}}
            placeholder="***assign id to edit styles***"
           />      
         </div>

        <div class="attribute-row">
            <Textfield 
            variant = 'filled'
            type= 'text'
            label= innerText 
            value={$activeNode?.attributes.innerText || ''} 
           on:input={(e)=>{
            $activeNode.attributes.innerText = e.target.value}}
           />      
         </div>
      
        {#each attributes as attribute }
        <div class="attribute-row">
            <Textfield 
            variant = 'filled'
            type= 'text'
            label= {attribute}          
            value={$activeNode?.attributes[attribute] || ''} 
           on:change ={(e)=>$activeNode.attributes[attribute] = e.target.value}
           />
        
         </div>

              
        {/each}
        <form on:submit|preventDefault={handleSubmit} bind:this ={styleForm} class = style-form>
 
            <div class='table-header'>
                Styles
            </div>
            {#each Styles as style } 
    
            <div class="attribute-row">
                <Textfield 
                disabled = {fieldDisabled}
                variant = 'filled'
                type= 'text'
                label= {style + ' ' + IDmsg}          
                value={$activeNode?.styles[style] || ''} 
               on:input ={(e)=>$activeNode.styles[style] = e.target.value}
               />
            
             </div>
     
        {/each}
    </form>
        {:else}
        <div class='table-header'>
            Global 
         </div>
        <div>
            <TabBar tabs={['ELEMENTS', 'CLASSES']} let:tab bind:active>
              <!-- Note: the `tab` property is required! -->
              <Tab {tab}>
                <Label>{tab}</Label>
      
              </Tab>
            </TabBar>
           
        </div>
           
         {#if active === 'ELEMENTS'}
         <div>
            <Select variant="filled" bind:value label="Select Element To Style">
              <Option value="" />
              {#each elements as element}
                <Option value={element}>{element}</Option>
              {/each}
            </Select>
         
            <pre class="status">Selected: {value}</pre>
          </div>
         {#each attributes as attribute }
   
         <div class="attribute-row">
             <Textfield 
             class = 'editorInput'
             variant = 'filled'
             label= {attribute}          
             value={''} 
            on:input ={(e)=>$activeNode.attributes[attribute] = e.target.value}
            />
         
          </div>
         <!-- <div class = "attribute-row">
             <div class = "editor-title">  
                 <p >{attribute}: </p> 
             </div>
             <div class = "editor-input">  
                 <input type="text" value = '' on:change={(e)=>$activeNode.attributes[{attribute}] = e.target.value}/>
             </div>
         </div>    -->
         {/each}
         
        {:else}
        {#each Styles as style } 
    
            <div class="attribute-row">
                <Textfield 
                disabled = {fieldDisabled}
                variant = 'filled'
                type= 'text'
                label= {style + ' ' + IDmsg}          
                value={$activeNode?.styles[style] || ''} 
               on:input ={(e)=>$activeNode.styles[style] = e.target.value}
               />
            
             </div>
     
        {/each}

         {/if}
      {/if}
      
            </form >
   
            <!-- <form on:submit|preventDefault={handleSubmit} bind:this ={styleForm} class = style-form>
 
        <div class='table-header'>
            Styles
        </div>
        {#each Styles as style } 

        <div class="attribute-row">
            <Textfield 
            disabled = {fieldDisabled}
            variant = 'filled'
            type= 'text'
            label= {style + ' ' + IDmsg}          
            value={$activeNode?.styles[style] || ''} 
           on:input ={(e)=>$activeNode.styles[style] = e.target.value}
           />
        
         </div>
 
    {/each}
</form> -->
    <!-- {/if} -->

<!-- <div>
    <button class = 'submit-btn' type='submit'>Apply</button>
</div> -->
</container>
<div style= 'height: 150px'>

</div>

<style>
.attribute-row {
    display:grid;
    grid-template-columns: 1fr ;
    align-items: center;
    width: '100%';
    /* border: 1px darkgray solid; */
    padding:-2px;

    padding-top:0 ;
    padding-bottom:0;
}

  .table-header {
      display:flex;
      padding: 10px;
      margin-bottom: 10px;
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

  p {
    padding-left: 10px;
  }

</style>
