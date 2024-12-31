/**
 * 
 * @param {String} tag 
 * @param {object} attributes 
 * @param {*} children 
 * @returns {HTMLElement}
 */
export function createElelement(tag,attributes={},children=[]){
    const element = document.createElement(tag)
    for(const[attribute, value] of Object.entries(attributes)){
        if(value !== null){
            element.setAttribute(attribute,value)
        }
        
    }
    /*
    for(const child of children){
        if(typeof child === "string"){
            element.appendChild(document.createTextNode(child))
        }else{
            element.appendChild(child)
        }
    }*/
    return element
}