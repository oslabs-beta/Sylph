<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import "brace/mode/html";
  import "brace/mode/css";
  import "brace/mode/javascript";
  import "brace/theme/chrome";
  import "brace/theme/monokai";

  //props
  export let lang;
  let text;
  switch (lang) {
    case 'javascript':
    text = `function test() {\n  return 42\n}`;
      break;
      case 'html':
        text= `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>Sylph</title>
  </head>

  <body>Hello World!</body>
</html>`
break;
case 'css':
  text = `h1{
    color: blue;
  }`;
  break;

  
    default:
      break;
  }

</script>

<div class="editor-container">
  <div class="editor-lable">{lang}</div>
  <AceEditor
    on:selectionChange={(obj) => console.log(obj.detail)}
    on:paste={(obj) => console.log(obj.detail)}
    on:input={(obj) => console.log(obj.detail)}
    on:focus={() => console.log('focus')}
    on:documentChange={(obj) => console.log(`document change : ${obj.detail}`)}
    on:cut={() => console.log('cut')}
    on:cursorChange={() => console.log('cursor change')}
    on:copy={() => console.log('copy')}
    on:init={(editor) => console.log(editor.detail)}
    on:commandKey={(obj) => console.log(obj.detail)}
    on:changeMode={(obj) => console.log(`change mode : ${obj.detail}`)}
    on:blur={() => console.log('blur')}
    width='100%'
    height='300px'
    lang={lang}
    theme="monokai"
    value={text} 
    readonly={true}
    options={{lineNumbers: false}}/>
</div>

<style>
  *{
    text-align: left;
  }
</style>