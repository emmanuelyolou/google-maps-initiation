export default class DOMHelper{
    constructor(){};

    createAccordion(accordionTitle){
        //Wrapper of the whole accordion
        let contentBox = document.createElement('div');
        contentBox.classList.add('accordion-box');
        //Title Of the accordion
        let contentTitle = document.createElement('h4');
        contentTitle.classList.add('accordion-content-title');
        contentTitle.innerHTML = accordionTitle;
        //content
        let content = document.createElement('div');
        content.classList.add('accordion-content');
        //Info list (eg: distance, duration...)
        let infoItemList = document.createElement('ul');
        // let infoItem = document.createElement('li');
        // // let infoItemTitle = document.createElement('strong');
        // // infoItemTitle.classList.add('info-item-title');
        // // let infoItemValue = document.createElement('span');

        // infoItem.appendChild(infoItemTitle);
        // infoItem.appendChild(infoItemValue);
        // infoItemList.appendChild(infoItem);

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
        let accordionContent = accordion.querySelector('.accordion-content');
        ["distance", "responsable", "contact"].forEach( element => {
            let accordionItem = this.createInfoItem( element );
            accordionContent.appendChild(accordionItem);
        });
        return accordion;
    }

    createInfoItem(title, value=""){
        let infoItem = document.createElement('li');
        infoItem.classList.add('accordion-info-item')
        let infoItemTitle = document.createElement('strong');
        infoItemTitle.classList.add('info-item-title', title);
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
    addAgencyInfoToAccordion(agency, accordion){

    }
}