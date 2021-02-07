const { remote } = require('electron');

var objFile = "";

let types = [
 {name: 'Models', extensions: ['obj']}
];

options = {filters:types, properties:['openFile']};

function openFile() {
    remote.dialog.showOpenDialog(options).then(response => {
        if (!response.canceled) {
            objFile = response.filePaths[0]; // Get file name
            document.getElementById("fileName").value = objFile; // Show selected file name
            document.getElementById("parseBtn").disabled = false;
        }
    })
}