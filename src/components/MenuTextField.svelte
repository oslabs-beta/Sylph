<script>
    export let itemPair
</script>

<td>
    <div class = "editor-input">  
    <p>{itemPair[0]}: </p>
</td>
   <td>
       <div class = "editor-input">  
           <input type="text" bind:value={itemPair[1]}
           />
        </div>
    </td>

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
  
      ul {
          list-style: none;
      }
    </style>
