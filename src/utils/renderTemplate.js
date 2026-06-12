const fs = require("fs");
const path = require("path");

function renderTemplate(templateName, data) {
    let html = fs.readFileSync(
        path.join(__dirname, "../templates", `${templateName}.html`),
        "utf-8"
    );

    // Generate photos HTML
    let photosHtml = '';
    if (data.photos && data.photos.length) {
        photosHtml = data.photos.map((photo, index) => {
            const imageUrl = typeof photo === 'object' 
                ? (photo.image_url || photo.path || '') 
                : photo;
            const title = typeof photo === 'object' 
                ? (photo.title || 'Bild') 
                : 'Bild';
            
            return `
                <div class="bg-white rounded-lg overflow-hidden shadow">
                    <img
                        src="${imageUrl}"
                        alt="${title}"
                        class="w-full h-40 object-cover"
                    />
                    <div class="p-2 text-center">
                        <h3 class="text-xs text-gray-500 text-left">
                            ${title} ${index + 1}
                        </h3>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        photosHtml = `
            <div class="col-span-3 text-center text-gray-500 py-4">
                Keine Fotos vorhanden
            </div>
        `;
    }
    
    // Replace all placeholders
    Object.keys(data).forEach((key) => {
        if (key === 'photos') {
            html = html.replace(`{{${key}_grid}}`, photosHtml);
        } else {
            html = html.replaceAll(`{{${key}}}`, data[key] || '');
        }
    });

    return html;
}

module.exports = renderTemplate;