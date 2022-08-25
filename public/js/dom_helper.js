export default class DOMHelper{
    constructor(){};

    createAccordion(accordionTitle){
        //Wrapper of the whole accordion
        let contentBox = document.createElement('div');
        //Accordions are hidden by default
        contentBox.classList.add('hidden');
        contentBox.classList.add('accordion-box', accordionTitle);
        //Title Of the accordion
        let contentTitle = document.createElement('h4');
        contentTitle.classList.add('accordion-content-title');
        contentTitle.innerHTML = accordionTitle;
        //content
        let content = document.createElement('div');
        content.classList.add('accordion-content');
        //Info list (eg: distance, duration...)
        let infoItemList = document.createElement('ul');
        content.appendChild(infoItemList);

        contentBox.appendChild(contentTitle);
        contentBox.appendChild(content);
        contentTitle.addEventListener('click', function(){
            this.classList.toggle('inactive')
        })
        return contentBox;
    }

    createLocationAccordion(title){
        let accordion = this.createAccordion(title);
        let accordionItemList = accordion.querySelector('.accordion-content ul');
        ["agence", "responsable", "contact"].forEach( element => {
            let accordionItem = this.createInfoItem( element );
            accordionItemList.appendChild(accordionItem);
        });
        return accordion;
    }

    createRouteAccordion(title){
        let accordion = this.createAccordion(title);
        let accordionItemList = accordion.querySelector('.accordion-content ul');
        ["distance", "durée"].forEach( element => {
            let accordionItem = this.createInfoItem( element );
            accordionItemList.appendChild(accordionItem);
        });
        return accordion;
    }

    createInfoItem(title, value=""){
        let infoItem = document.createElement('li');
        infoItem.classList.add('accordion-info-item', title)
        let infoItemTitle = document.createElement('strong');
        infoItemTitle.classList.add('info-item-title');
        infoItemTitle.innerHTML = title;
        let infoItemValue = document.createElement('span');
        infoItemValue.innerHTML = value;

        infoItem.appendChild(infoItemTitle);
        infoItem.appendChild(infoItemValue);
        // debugger
        return infoItem;
    }
    createAccordionWrapper(){
        let accordionWrapper = document.createElement('div');
        accordionWrapper.classList.add('accordion-wrapper');
        return accordionWrapper;
    }

    //agency: Agency object from the utb_agence.json
    addAgencyInfoToAccordion(agency, accordion){
        accordion.querySelector('.agence span').innerHTML = agency.name_agence;
        accordion.querySelector('.responsable span').innerHTML = agency.responsable_agence;
        accordion.querySelector('.contact span').innerHTML = agency.contact_agence;
        accordion.classList.remove('hidden');
    }

    //agency: Agency object from the utb_agence.json
    addRouteInfoToAccordion(distance, duration, accordion){
        this._addDistanceInfoToAccordion(distance, accordion);
        this._addDurationInfoToAccordion(duration, accordion);
        accordion.classList.remove('hidden');
    }

    //agency: Agency object from the utb_agence.json
    _addDistanceInfoToAccordion(distance, accordion){
        accordion.querySelector('.distance span').innerHTML = distance;
    }

    //agency: Agency object from the utb_agence.json
    _addDurationInfoToAccordion(duration, accordion){
        accordion.querySelector('.durée span').innerHTML = duration;
    }

    resetLocationAccordion(locationAccordion){
        locationAccordion.querySelectorAll('.accordion-info-item span').forEach(
            infoItem => infoItem.innerHTML = ""
        );
        locationAccordion.classList.add('hidden');
    }
    resetRouteAccordion(routeAccordion){
        routeAccordion.querySelectorAll('.accordion-info-item span').forEach(
            infoItem => infoItem.innerHTML = ""
        );
        routeAccordion.classList.add('hidden');
    }
}