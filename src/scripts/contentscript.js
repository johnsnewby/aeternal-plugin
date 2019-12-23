import ext from "./utils/ext"

//This event listener will determine if the context menu should be updated
//based on if the right-button was clicked and if there is a selection or not
document.addEventListener("selectionchange", function(event){
  const selected = window.getSelection().toString()
  if(selected !== '') {
    //get selected text and send request to bkgd page to create menu
    ext.runtime.sendMessage({
      'message': 'updateContextMenu',
      'selection': selected
    })
  } else {
    ext.runtime.sendMessage({
      'message': 'updateContextMenu',
      'selection': false
    });
  }
}, true)