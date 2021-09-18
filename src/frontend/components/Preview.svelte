<script lang="ts">
  import Editor from "./Editor.svelte";
  globalThis.api.project.send('read', {path: 'src\\App.svelte'});
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
  const showCode = ()=>{
    globalThis.api.project.send('read', {path: 'src\\App.svelte'});
    console.log('hitting read')
  }
  const editCode = ()=>{
    const newData = `<script>
	export let name;
  ${'<'}/script>

<main>
	good bye world
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>`;

    globalThis.api.project.send('writeOver', {path: 'src\\App.svelte', data: newData});
    console.log('hitting read')
    
  }

  globalThis.api.project.receive('readProject', (data)=>{
    displayedCode = data;
  })
  globalThis.api.project.receive('overwritten', (sucessful)=>{
    if(sucessful){
      globalThis.api.project.send('updateProject')
      globalThis.api.project.send('getEntry')
      iframeElement.src+='';
    }else{
      console.log('failed to update project');
    }

  })
  

  let entryPoint:string = 'https://www.google.com/';
  globalThis.api.project.receive('entryPoint', data=>{
    console.log("EntryPoint: ", data)    
    
    
    
    entryPoint = data;
  })

  let iframeElement;
  
</script>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: white;
  }
</style>

<section>
  <!-- <button on:click={showCode}>get file string</button>
  <button on:click={editCode}>update file</button> -->
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
</section>
