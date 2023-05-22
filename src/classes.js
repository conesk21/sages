const coinFactory = (name,denom) => {
    const getName = () => name;
    const getDenom = () => denom;
   
    return {getDenom, getName}
};

const currencyFacory = (coinArray) => {
    const valueToCoins = (ammount) =>{
        var result = {}
        for(let i=coinArray.length-1;i>=0;i--){
            let coinCounter = 0 
            while(ammount>=coinArray[i].getDenom()){
                ammount -= coinArray[i].getDenom()
                coinCounter += 1 
            }
            result[coinArray[i].getName()] = coinCounter
            
        }
        return result
    }
    const valueToString = (ammount) =>{
        var result = [];
        for(let i=coinArray.length-1;i>=0;i--){
            let coinCounter = 0 
            while(ammount>=coinArray[i].getDenom()){
                ammount -= coinArray[i].getDenom()
                coinCounter += 1 
            }
            
            if (coinCounter!== 0){
            result.push([coinCounter, coinArray[i].getName()])
            }
        }
        return result.map((value) => value.join(" ")).join(", ")
    }
    const coinToValue = (coinsObject)=>{
        var value = 0;
        for (const key in coinsObject){
            var result = coinArray.find(item => {
                return item.getName() === key
              })
              value += coinsObject[key] * result.getDenom()
        }
        return value

    }
    
    return {valueToCoins,valueToString,coinToValue}
}

const copper = coinFactory("copper",.01)
const silver = coinFactory("silver",.1)
const gold = coinFactory("gold",1)
const platinum = coinFactory("platinum", 10)
const array = [copper, silver, gold, platinum]

const fantasy = currencyFacory(array)

const itemFactory = (name, value)=>{
    var original = value;
    const revert =()=>{
        value = original
    }
    const revalue = (multiplier) =>{
        value = value*multiplier;

    }
    const getValue = () => value;

    const toString = () => name + ": " + value.toString();

    return {name, revert, revalue, getValue, toString}
}

const bread = itemFactory("bread",2);
const ale = itemFactory("ale",4);
const cheese = itemFactory("cheese",10);

const items = [bread, ale, cheese]


const economyFactory = (itemArray)=>{
    var globalTransform = 1

    const revalue = (multiplier)=>{
        globalTransform = globalTransform*multiplier
        itemArray.forEach(element => {
            element.revalue(multiplier)
        });
    }

    const revert = () => {
        itemArray.forEach(element => {
            element.revert()
        });
    }
    const display = ()=>{
        var result = []
        for (let i = 0; i<itemArray.length;i++){
            result.push([itemArray[i].name, itemArray[i].getValue()])
        }
        return result
    }
    
    const names = () =>{
        var result = []
        for (let i = 0; i<itemArray.length;i++){
            result.push(itemArray[i].name)
        }
        return result
    }

    const addItem = (name, value) => {
        var newItem = itemFactory(name, value/globalTransform);
        newItem.revalue(globalTransform);
        itemArray.push(newItem);
    }
    const changeItemValue = (name, multiplier) =>{
        var result = itemArray.find(item => {
            return item.name === name
          })
        result.revalue(multiplier);
    }
    const getItemValue = (name) =>{
        var result = itemArray.find(item => {
            return item.name === name
          })
        return result.getValue();
    }

    const getItem = (name) =>{
        var result = itemArray.find(item => {
            return item.name === name
          })
        return result;
    }

    
    return {revert, revalue, addItem, changeItemValue, getItemValue, names, getItem, display}

}

const smallTown = economyFactory(items,fantasy)

 

export { smallTown, fantasy}


