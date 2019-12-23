import ext from "./utils/ext"
import {clearMenu, generateMenuItems} from "./utils/menu";

// add a message listener that will modify the context menu however you see fit
ext.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'updateContextMenu') {
    if (request.selection) {
      generateMenuItems(request.selection)
    } else {
      // Clear menu when nothing selected
      clearMenu()
    }
  } else {
    sendResponse({})
  }
})