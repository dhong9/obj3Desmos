const { dialog } = require('electron').remote;

var objFile = "";

let types = [
 {name: 'Models', extensions: ['obj']}
],

options = {filters:types, properties:['openFile']}

function openFile() {
    dialog.showOpenDialog(options).then(response => {
        if (!response.canceled) {
            objFile = response.filePaths[0];
        }
    })
}