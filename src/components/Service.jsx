export const encrypt = (listObject) => {
    let encryptedString='';

    for(let index in listObject){
        
        let object = listObject[index];

        Object.keys(object)
        .forEach((keyObject) =>{
         encryptedString += `${keyObject}=${object[keyObject]}&`;
        })

        encryptedString += '*';
    }

    return encryptedString;
}

const splitString = (string, splittingChar) => {
    let splitArray = string.split(splittingChar);
    return splitArray;
}

export const decrypt = (encryptedString) => {
    
    let listObject = [];
    let objectArray = splitString(encryptedString, '*');

    for(let index in objectArray)
    {
        let object = objectArray[index];

        if(object === '') break;

        let propertyArray = splitString(object, '&');
        const newObject = new Object();

        let elementArray = splitString(propertyArray[0],'=');
        newObject[elementArray[0]] = elementArray[1];

        elementArray = splitString(propertyArray[1],'=');
        newObject[elementArray[0]] = (elementArray[1] === 'true' ? true : false);

        listObject.push(newObject);
    }
    return listObject;
}