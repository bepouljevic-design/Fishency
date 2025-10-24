function downloadFile() {
    const link = document.createElement('a');
    link.href = "../Assets/images/head-background.jpg";
    link.download = 'head-background.jpg';
    link.click();
}

function del(button) {
    if(confirm("Are you shore you want to delete this?")){
        button.closest(".container-C").remove()
    }
}


document.addEventListener('DOMContentLoaded', function() {
    for (let index = 0; index < 10; index++) {
        const file = document.createElement('div');
        file.className = 'container-C hover';
        file.innerHTML = `
                <img src="Assets/images/head-background.jpg" alt="fish img">
                <img class="btn-delete am-hover" onclick="del(this)" src="Assets/images/delete.png" alt="save icon">

                <img class="btn-download am-hover" onclick="downloadFile()" src="Assets/images/downloading.png" alt="save icon">
                <p>Accuracy: </p>
            `;

        const parent = document.querySelector(".am-container");
        parent.appendChild(file);
    }
    
});