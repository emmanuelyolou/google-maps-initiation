//Wrapper of the whole accordion
let contentBox = document.createElement('div');
contentBox.classList.add('accordion-content-box');
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
document.body.appendChild(contentBox)