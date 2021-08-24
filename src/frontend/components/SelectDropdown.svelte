<script>
    import Select from 'svelte-select';
  export let items
  export let value
    // let items = [
    //   {value: 'chocolate', label: 'Chocolate'},
    //   {value: 'pizza', label: 'Pizza'},
    //   {value: 'cake', label: 'Cake'},
    //   {value: 'chips', label: 'Chips'},
    //   {value: 'ice-cream', label: 'Ice Cream'},
    // ];
  
    
  
    function handleSelect(event) {
      console.log('selected item', event.detail, event.target);
      
    }
  </script>

<div class = 'dropContainer'>
    <p>Display  </p> 
    <Select {items} {value} on:select={handleSelect}></Select>
</div>


  <style>
.dropContainer {
    display:grid;
    grid-template-columns: 30% 70%;
    /* align-items: center; */

          font-size:.6em;
          /* grid-template-columns: 40% 60%; */
          grid-column-gap: 10px;
          /* align-items: center; */
          border-radius: 5px;
          /* justify-content: center; */
          /* width: 100%; */

      
}

  </style>