let menuBox = document.getElementById('menuBox')
let menuIcon = document.getElementById('menuIcon')

function openIcon() {
    menuBox.classList.toggle("open-menu")

    if (menuBox.classList.contains("open-menu")) {
        menuIcon.src ="img/close.png"
    } else {
        menuIcon.src ="img/menu.png"
        
    }
}