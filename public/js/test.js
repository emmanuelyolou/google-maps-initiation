import DOMHelper from "./dom_helper.js";
import MarkerManager from "./marker_manager.js";
import { readTextFile } from "./utils.js";
// document.body.appendChild(new DOMHelper().createInfoItem('Respo', 'Tahanman'));
// let domHelper = new DOMHelper();
// let accordion = domHelper.createAccordion("Départ");
// accordion.querySelector('ul').appendChild(
//     domHelper.createInfoItem("Responsable", "Hizahi Python le danger")
// );
// let accordion2 = domHelper.createAccordion("Départ");
// accordion2.querySelector('ul').appendChild(
//     domHelper.createInfoItem("Responsable", "Hizahi Python le danger")
// );
// document.body.appendChild(accordion);
// document.body.appendChild(accordion2);
let markerManager = new MarkerManager();
  //Defines then displays multiple markers on the map
  markerManager.agencyList = JSON.parse(readTextFile("./utb_agence.json"));

  //Creating the accordion
  let domHelper = new DOMHelper();
  let accordionWrapper = domHelper.createAccordionWrapper();
  let originAccordion = domHelper.createLocationAccordion("origin");
  let destinationAccordion = domHelper.createLocationAccordion("destination");
  accordionWrapper.appendChild(originAccordion);
  accordionWrapper.appendChild(destinationAccordion);
  domHelper.addAgencyInfoToAccordion(markerManager.agencyList[0], originAccordion);
document.body.appendChild(accordionWrapper)
