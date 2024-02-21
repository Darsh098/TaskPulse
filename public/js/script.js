function changeSelectedColor(ddl, index) {
    if (index == 0) {
        ddl.style.backgroundColor = "#ffdada";
        ddl.style.color = "#f86c6b";
    }

    else if (index == 1) {
        ddl.style.backgroundColor = "#fff0ab";
        ddl.style.color = "#f8cb00";
    }
    else if (index == 2) {
        ddl.style.backgroundColor = "#cfedda";
        ddl.style.color = "#4dbd74";
    }
    ddl.style.fontWeight = 800;
}

let ddl = document.getElementById('task-priority');
ddl.selectedIndex = 0;
changeSelectedColor(ddl, ddl.selectedIndex);

ddl.addEventListener('change', () => {
    changeSelectedColor(ddl, ddl.selectedIndex);
})