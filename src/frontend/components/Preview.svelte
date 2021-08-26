<script lang="ts">
  import Editor from "./Editor.svelte";
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
	Hello world
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
    }else{
      console.log('failed to update project');
    }

  })

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
  <button on:click={showCode}>get file string</button>
  <button on:click={editCode}>update file</button>
  <Editor lang='html' text={displayedCode} filename='index.svelte'/>
    <iframe 
      title="codePreview" 
      srcdoc={renderedCode} 
      frameborder="0"
      width="100%"
      height="100%"
    />
</section>
