import DOMHelper from "./dom_helper.js";
// document.body.appendChild(new DOMHelper().createInfoItem('Respo', 'Tahanman'));
let domHelper = new DOMHelper();
let accordion = domHelper.createAccordion("Départ");
accordion.querySelector('ul').appendChild(
    domHelper.createInfoItem("Responsable", "Hizahi Python le danger")
);
document.body.appendChild(accordion);