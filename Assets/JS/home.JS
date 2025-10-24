function del(button) {
    if(confirm("Are you shore you want to delete this?")){
        button.closest(".set_of_images").remove()
    }
}

function download(){
    const link = document.createElement('a');
    link.href = "../Assets/images/Fish-detections";
    link.download = 'Fish-detections';
    link.click();
}

document.addEventListener('DOMContentLoaded', function() {
    for (let index = 0; index < 10; index++) {
        const file = document.createElement('div');
        file.className = 'set_of_images hover';
        file.innerHTML = `
            <div class="left" onclick="document.location='images.html'">
                <img src="Assets/images/head-background.jpg" class="first_image" alt="first fish img">
                <div class="info">
                    <h4>lubin_2025-05-26_20-30-37</h4>
                    <p>Number of images:</p>
                </div>
            </div>
            <div class="right">
                <button class="hover" onclick="del(this)"><img src="Assets/images/delete.png" alt="delete icon"></button>
                <button class="hover" onclick="download(this)"><img src="Assets/images/downloading.png" alt="save icon"></button>
            </div>
            `;

        const parent = document.querySelector(".files");
        parent.appendChild(file);
    }
    
});

// Search 
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.set_of_images');
            
            items.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const matches = title.includes(searchTerm);
                item.style.display = matches ? 'flex' : 'none';
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const scanButton = document.createElement('button');
    scanButton.textContent = 'Skeniraj Fish-detections folder';
    scanButton.className = 'scan-button';
    scanButton.onclick = scanFolders;
    
    const container = document.getElementById('detections-container');
    container.innerHTML = '';
    container.appendChild(scanButton);
});
