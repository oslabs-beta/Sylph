<script lang="ts">
  import Editor from "../components/Editor.svelte";

  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
 
  let tabs = [
    {
      icon: 'access_time',
      label: '',
    },
    {
      icon: 'near_me',
      label: '',
    },
    {
      icon: 'favorite',
      label: '',
    },
  ];

  let active = tabs[0];

  globalThis.api.project.send('read', {path: 'src/App.svelte'});
    console.log('hitting read')
  let renderedCode = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
  
      <title>Sylph</title>
    </head>
  
    <body>Hello World!</body>
  </html>`
  let displayedCode:string = ' ';

  let buildFinished=false;
  globalThis.api.project.receive('projectUpdated', ()=>{
    console.log('projectUpdated received')
    buildFinished= true;
  })

  globalThis.api.project.receive('readProject', (data)=>{
    displayedCode = data;
  })
  globalThis.api.project.receive('overwritten', (sucessful)=>{
    if(sucessful){
      if(buildFinished){
        globalThis.api.project.send('updateProject')
        buildFinished = false;
      }
      globalThis.api.project.send('getEntry')
      iframeElement.src+='';
    }else{
      console.log('failed to update project');
    }

  })
  

  let entryPoint: string = '';
  globalThis.api.project.receive('entryPoint', data=>{
    console.log("EntryPoint: ", data)        
    entryPoint = data;
  })

  let iframeElement;
  
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: white;
  }

  #preview-editor-tabs {
    --mdc-theme-primary: darkmagenta;
  }

  .preview-editor-content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>

<section>
  <!-- <button on:click={showCode}>get file string</button>
  <button on:click={editCode}>update file</button> -->
  <div id="preview-editor-tabs">
    <TabBar 
      {tabs} 
      let:tab 
      bind:active
    >
      <Tab {tab}>
        <Icon class="material-icons">{tab.icon}</Icon>
        <Label>{tab.label}</Label>
      </Tab>
    </TabBar>
  </div>
  <div class="preview-editor-content">
  {#if active === tabs[0]}
    <Editor lang='html' text={displayedCode} filename='index.svelte'/>
  {:else if active === tabs[1]}
    <iframe
      bind:this={iframeElement}
      id="iframe"
      title="codePreview" 
      src={entryPoint} 
      frameborder="0"
      width="100%"
      height="100%"
    />
  {:else}
    <Editor lang='html' text={displayedCode} filename='index.svelte'/>
    <iframe
      bind:this={iframeElement}
      id="iframe"
      title="codePreview" 
      src={entryPoint} 
      frameborder="0"
      width="100%"
      height="100%"
    />
  {/if}
  </div>
</section>