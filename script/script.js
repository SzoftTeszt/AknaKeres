// console.log("Helló")
const palya = document.getElementById('palya')

function palyaKeszit(sor,oszlop, aknaSzam){

    for (let i = 0; i < sor; i++) {
        const sorDiv = document.createElement("div")
        sorDiv.classList.add("sor")

        for (let j = 0; j < oszlop; j++) {
            const cella= document.createElement("div")
            cella.classList.add("cella")
            cella.addEventListener("mousedown", kattintas)
            cella.addEventListener("contextmenu", (event)=>event.preventDefault())
            sorDiv.appendChild(cella)
        }

        palya.appendChild(sorDiv)
    }
    aknasit(sor,oszlop, aknaSzam)
}

function aknasit(sor,oszlop, aknaSzam){
    for (let i = 0; i < aknaSzam; i++) {

        const x = Math.floor(Math.random()*sor)
        const y = Math.floor(Math.random()*oszlop)

        const aktCella = palya.children[x].children[y]
        if (!aktCella.dataset.akna){
            // aktCella.style.backgroundImage='url("./img/akna.png")'
            aktCella.classList.add('akna')
            aktCella.dataset.akna=1
        }
        else i--        
    }

    const cellak= document.getElementsByClassName("cella")
    for (const element of cellak) {
        element.dataset.aknakSzama=aknatSzamol(element)
    }

}

function aknatSzamol(cella){
    let aknakSzama=0
    if ((cella.previousElementSibling) 
        && (cella.previousElementSibling.dataset.akna)) aknakSzama++;

     if (cella.nextElementSibling?.dataset.akna) aknakSzama++;
     
     let hanyadik=0
     let sCella=cella
    //   console.log(sCella,":",hanyadik)   
     while(sCella.previousElementSibling)
        {
            // console.log("Ciklus",sCella,":",hanyadik)   
            hanyadik++
            sCella=sCella.previousElementSibling
        }
    //  console.log(hanyadik)   

      if (cella.parentNode.previousElementSibling?.children[hanyadik-1]?.dataset.akna)
        aknakSzama++
      if (cella.parentNode.previousElementSibling?.children[hanyadik]?.dataset.akna)
        aknakSzama++
      if (cella.parentNode.previousElementSibling?.children[hanyadik+1]?.dataset.akna)
        aknakSzama++

      if (cella.parentNode.nextElementSibling?.children[hanyadik-1]?.dataset.akna)
        aknakSzama++
      if (cella.parentNode.nextElementSibling?.children[hanyadik]?.dataset.akna)
        aknakSzama++
      if (cella.parentNode.nextElementSibling?.children[hanyadik+1]?.dataset.akna)
        aknakSzama++


     return aknakSzama;
}


palyaKeszit(5,5,1)

function nyitas(cella){
    if (!cella || cella.classList.contains("nyitva")) return
    cella.classList.add("nyitva")
    cella.removeEventListener("mousedown", kattintas)
    if (cella.dataset.aknakSzama!="0")
                    cella.textContent=cella.dataset.aknakSzama
    else{
        nyitas(cella.previousElementSibling);
        nyitas(cella.nextElementSibling);
        let hanyadik=0
        let sCella=cella
        while(sCella.previousElementSibling)
        {           
            hanyadik++
            sCella=sCella.previousElementSibling
        }
        nyitas(cella.parentNode.previousElementSibling?.children[hanyadik-1]);
        nyitas(cella.parentNode.previousElementSibling?.children[hanyadik])
        nyitas(cella.parentNode.previousElementSibling?.children[hanyadik+1])

        nyitas(cella.parentNode.nextElementSibling?.children[hanyadik-1]);
        nyitas(cella.parentNode.nextElementSibling?.children[hanyadik])
        nyitas(cella.parentNode.nextElementSibling?.children[hanyadik+1])

    }
    console.log("cella: ",document.getElementsByClassName("cella").length)
    console.log("akna: ",document.getElementsByClassName("akna").length)
    // Üzleti logika?
    // Mikor győztem????
    if ((document.getElementsByClassName("cella").length-document.getElementsByClassName("akna").length)==document.getElementsByClassName("nyitva").length)
    {  
         console.log("Győztünk")
    }
    }



function kattintas(event){
    console.log(event.button)

    switch (event.button){
        case 0:
            // console.log(this)
            if (!event.target.classList.contains('zaszlo') 
                && (event.target.dataset.akna)) 
                        console.log("Vesztettél te buta!!!")
            else{
                // jó helyre kattintott
                // event.target.style.border="none"
                nyitas(event.target)
            }
            break
        case 2:
            // event.currentTarget.style.backgroundColor="white"
            // event.currentTarget.style.backgroundImage ="url('./img/flag.png')"
            // event.currentTarget.style.backgroundSize ="contain"

            event.target.classList.toggle('zaszlo')
            break
    }
}
