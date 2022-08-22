export function readTextFile(file)
{
    let rawFile = new XMLHttpRequest();
    let result;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                result = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return result;
}

export function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    });
  }
  