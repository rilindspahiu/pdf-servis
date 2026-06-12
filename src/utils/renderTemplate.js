const fs = require("fs");
const path = require("path");

function renderTemplate(templateName, data) {
    let html = fs.readFileSync(
        path.join(__dirname, "../templates", `${templateName}.html`),
        "utf-8"
    );

    Object.keys(data).forEach((key) => {
        html = html.replaceAll(`{{${key}}}`, data[key]);
    });

    return html;
}

module.exports = renderTemplate;