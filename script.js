/* ============== SOBRE MÍ - GAMEBOY =======================*/
/* ============== SOBRE MÍ - GAMEBOY =======================*/
/* ============== SOBRE MÍ - GAMEBOY =======================*/

/*Array de objetos, con contenido de opciones */
const aboutMe = [
    {
        titulo: "Perfil Profesional",
        descripcion: "Desarrollador Full Stack Junior con sólidos fundamentos técnicos en el ecosistema de desarrollo integral. Combino una sólida experiencia previa en liderazgo de equipos y gestión comercial colaborativa con competencias técnicas orientadas a la optimización de procesos. Comprometido con la aplicación de metodologías ágiles y principios de Ingeniería de Software Sostenible para el diseño de arquitecturas eficientes. Profesional, analítico, Y enfocado en transformar requerimientos complejos en soluciones tecnológicas escalables y de alto rendimiento que aporten valor estratégico a la organización."
    },
    {
        titulo: "Perfil Personal",
        descripcion: "Soy una persona con mentalidad analítica y resolución orientada a objetivos. Me define la curiosidad constante, la adaptabilidad y una sólida capacidad para colaborar con equipos bajo metodologías ágiles, Valoro la comunicación clara, la empatía y el pensamiento crítico como los pilares fundamentales para colaborar de forma efectiva y superar cualquier reto en sociedad."
    },
    {
        titulo: "Hobbies",
        descripcion: "Me apasiona la lectura, específicamente en temas sobre el comportamiento humano, el estoicismo y el desarrollo personal. Disfruto mucho crear música tanto como productor como tocando instrumentos musicales. Por último y como dato random, concluir el título de arquitectura es un reto personal pendiente en mi lista de cosas por hacer antes de morir."
    },
    {
        titulo: "Vision",
        descripcion: "Consolidarme como un referente en el desarrollo de software de alto valor. Aspiro a crear y colaborar en proyectos que generen un impacto positivo en la sociedad, colaborando con equipos multidisciplinarios donde la innovación, la optimización de recursos y el diseño centrado en las personas resuelvan problemas reales del mundo moderno."
    }
];



/*Seleccion de elementos en el DOM (html), querySelector hace referencia a una clase perteneciente al html, el contenido entre paréntesis es el nombre de la clase y va entre comiilas */

const elFirst = document.querySelector(".first");
const elContent = document.querySelector(".content");
const elGuide = document.querySelector(".guide")
const lcdContainer = document.querySelector(".lcd");


const btnUp = document.querySelector(".upBtn");
const btnDown = document.querySelector(".downBtn");
const btnLeft = document.querySelector(".leftBtn");
const btnRight = document.querySelector(".rightBtn");
const btnA = document.querySelector(".A");
const btnB = document.querySelector(".B");

/** Crea y define Interfaces para pantalla*/
let pantallaActual = 1;
/** Variables necesarios para la interfaz de menú*/
let fila = 0;
let columna = 0;
let selected;

const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

/*Creacion de constantes de audios*/
const nav = new Audio(`${basePath}audio/nav.mp3`);
const A = new Audio(`${basePath}audio/A.mp3`);
const B = new Audio(`${basePath}audio/B.mp3`);









/*Funcion que muestra la interfaz X en la pantalla, al inicio X es igual a 1, esta funcion, AL MISMO TIEMPO construye el contenido de LAS interfaces definidas con html, en css se cubren las clases correspondientes */
function mostrarPantalla(){
    /*PANTALLA 1 (INICIO)*/
    if(pantallaActual === 1){
    /*Construccion de pagina */
    elFirst.innerHTML=
    "Sobre Mí";
    elContent.innerHTML = 
    `<img id="lcdPic" src="${basePath}assets/pixels.jpg">`;
    elGuide.innerHTML = 
    `<div class="lcdBtn"><b>A</b></div> Entrar`;

    /*PANTALLA 2 (MENÚ)*/
    } else if (pantallaActual === 2){
    /*Formula para definir elemento selected usando variables fila y columna*/
    selected = (fila * 2) + columna;
    
    /*Construccion de pagina menú*/
    elFirst.innerHTML="Selecciona una opción:";
    elContent.innerHTML=
    `<div class="parent">
    <div class="div1 options ${selected === 0 ? "activo":""}">Perfil Profesional</div>

    <div class="div2 options ${selected === 1 ? "activo":""}">Perfil Personal</div>

    <div class="div3 options ${selected === 2 ? "activo": ""}">Hobbies</div>

    <div class="div4 options ${selected === 3 ? "activo": ""}">Visión</div>
    </div>`;
    elGuide.innerHTML = 
    `<div class="lcdarrow">▲▼◀▶</div> Navegar
    <div class="lcdBtn"><b>A</b></div> Seleccionar   
    <div class="lcdBtn"><b>B</b></div> Salir`;
    console.log(selected);
    /*PANTALLA 3 (OPCION SELECCIONADA)*/
    } else if (pantallaActual === 3){
        /*Construccion de pagina */
        elFirst.innerHTML=`${aboutMe[selected].titulo}`
        elContent.innerHTML=`${aboutMe[selected].descripcion}`
        elGuide.innerHTML= `<div class="lcdBtn"><b>B</b></div> Regresar`   
           
    }
};

mostrarPantalla();

/*Accionador de boton A, segun la pantalla en la que se encuentre es la acción que realiza*/
btnA.addEventListener("click", () =>{
    /*Si esta en pantalla de inicio, pasa a pantalla de menú*/
    if (pantallaActual === 1){
        A.currentTime = 0; 
            A.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
        pantallaActual = 2;
        mostrarPantalla();
        console.log("Cambiamos a pantalla " + pantallaActual);
        console.log("Fila: " + fila + "\n Columna: " + columna);
    /*Si esta en pantalla de de menú, pasa a pantalla de selección*/
    }else if(pantallaActual === 2){
        A.currentTime = 0; 
            A.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
        pantallaActual = 3;
         mostrarPantalla();
        console.log("Cambiamos a pantalla " + pantallaActual);
    }
});

/*Accionador de boton B, segun la pantalla en la que se encuentre es la acción que realiza*/
btnB.addEventListener("click", () =>{
    /*Si esta en pantalla de seleccion, pasa a pantalla de inicio*/
    if (pantallaActual === 2){
        B.currentTime = 0; 
            B.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
        pantallaActual = 1;
        mostrarPantalla();
        console.log("Cambiamos a pantalla " + pantallaActual);
        /*Si esta en pantalla de seleccion, pasa a pantalla de menú*/
    } else if(pantallaActual === 3){
        B.currentTime = 0; 
            B.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
        pantallaActual = 2;
         mostrarPantalla();
        console.log("Cambiamos a pantalla " + pantallaActual);
        console.log("Fila: " + fila + "\n Columna: " + columna);

    }
})

/*BOTONES DE NAVEGACION, SU ACCION AFECTA AL SISTEMA DE COORDENADAS  */
/*Accionador de boton ARRIBA, funcional solo en pantalla de menú*/
btnUp.addEventListener("click", () =>{
    if(pantallaActual === 2){
        
        if(fila === 1){
            nav.currentTime = 0; 
            nav.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
            fila--;
        }
        mostrarPantalla();
    }
    console.log("Fila: " + fila + "\n Columna: " + columna);
});

/*Accionador de boton ABAJO, funcional solo en pantalla de menú*/
btnDown.addEventListener("click", () =>{
    if(pantallaActual === 2){
        if(fila < 1){
             nav.currentTime = 0; 
            nav.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
            fila++;
            
        }
        mostrarPantalla();
    }
    console.log("Fila: " + fila + "\n Columna: " + columna);
});

/*Accionador de boton DERECHA, funcional solo en pantalla de menú*/
btnRight.addEventListener("click", () =>{
    if(pantallaActual === 2){
        if(columna < 1){
             nav.currentTime = 0; 
            nav.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
            columna++;
            
        }
        mostrarPantalla();
    }
    console.log("Fila: " + fila + "\n Columna: " + columna);
});

/*Accionador de boton IZQUIERDA, funcional solo en pantalla de menú*/
btnLeft.addEventListener("click", () =>{
    if(pantallaActual === 2){
        if(columna === 1){
            nav.currentTime = 0; 
            nav.play().catch(error => {
            console.log("Error al reproducir el audio:", error)});
            columna--;
            
        }
        mostrarPantalla();
    }
    console.log("Fila: " + fila + "\n Columna: " + columna);
});

