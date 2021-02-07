const fs = require("fs");

var eqns = [];

function obj2Desmos(src, dest) {
    eqns = []; // Reset equations data
    fs.readFile(src, (err, data) => {
        if (err)
            throw err;
        
        const lines = (data + '').split`\n`;

        const vertices = [];
        for (const line of lines) {
            const [dataType, ...rest] = line.split` `;
            if (dataType === "v") {
                // Vertex data
                vertices.push(rest.map(v => +v));
            }
            else if (dataType === "f") {
                // Get vertices that form triangle
                eqns.push(
                    rest.map(v => {
                        const [x, y, z] = vertices[v.split`/`[0] - 1]; // Indices are 1-based
                        return `\\left(x_{2}\\left(${x},\\ ${y},\\ ${z}\\right),\\ y_{2}\\left(${x},\ ${y},\\ ${z}\\right)\\right)`; // Desmos format
                    }).join`,`
                )
            }
        }

        fs.writeFile(dest, vertices.join`\n`, err => {
            if (err)
                throw err;
        });
    })
}

function parseFile() {
    const WIN = remote.getCurrentWindow();
    const options = {
        filters: [
            {name: "Text", extensions: ['txt']}
        ]
    }
    remote.dialog.showSaveDialog(WIN, options).then(response => {
        if (!response.canceled)
            obj2Desmos(objFile);
    });
}