export default class DOMHelper{
    constructor(){};

    createAccordion(){
        //Wrapper of the whole accordion
        let contentBox = document.createElement('div');
        contentBox.classList.add('accordion-box');
        //Title Of the accordion
        let contentTitle = document.createElement('h5');
        contentTitle.classList.add('accordion-content-title');
        //content
        let content = document.createElement('div');
        content.classList.add('accordion-content');
        //Info list (eg: distance, duration...)
        let infoItemList = document.createElement('ul');
        let infoItem = document.createElement('li');
        let infoItemTitle = document.createElement('strong');
        infoItemTitle.classList.add('info-item-title');
        let infoItemValue = document.createElement('span');

        infoItem.appendChild(infoItemTitle);
        infoItem.appendChild(infoItemValue);
        infoItemList.appendChild(infoItem);
        content.appendChild(infoItemList);

        contentBox.appendChild(contentTitle);
        contentBox.appendChild(content);
        return contentBox;
    }

    createInfoItem(title, value){
        let infoItem = document.createElement('li');
        infoItem.classList.add('accordion-info-item')
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
}