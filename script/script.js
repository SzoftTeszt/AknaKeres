console.log("Helló")

const cella= document.createElement("div")
cella.classList.add("cella")

document.body.appendChild(cella)
cella.addEventListener("mousedown", kattintas)
cella.addEventListener("contextmenu", (event)=>event.preventDefault())

function kattintas(event){
    console.log(event.button)

    switch (event.button){
        case 0:
            this.style.background="pink"
            break
        case 2:
            event.currentTarget.style.backgroundColor="white"
            event.currentTarget.style.backgroundImage ="url('./img/flag.png')"
            event.currentTarget.style.backgroundSize ="contain"

            break
    }
}
