<script>
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
  <Editor lang='html' text='<h1> Hello World </h1>' filename='index.svelte'/>
    <iframe 
      title="codePreview" 
      srcdoc={renderedCode} 
      frameborder="0"
      width="100%"
      height="100%"
    />
</section>
