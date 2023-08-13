var bigDecimal = require('js-big-decimal');

const coinFactory = (name,denom) => {
    const getName = () => name;
    const getDenom = () => denom;
   
    return {getDenom, getName}
};

const currencyFacory = (coinArray) => {
    const valueToCoins = (ammount) =>{
        var result = {}
        var ammountDec = new bigDecimal(ammount).round(2)
        for(var i=coinArray.length-1;i>=0;i--){
            var coinCounter = 0 
            var denomDec = new bigDecimal(coinArray[i].getDenom()).round(2)
            var value = ammountDec.compareTo(denomDec)
            while(true){
                if (value === -1){
                    break
                } else{
                    ammountDec = ammountDec.subtract(denomDec)
                    coinCounter += 1 
                    value = ammountDec.compareTo(denomDec)
                }
               
            }
            result[coinArray[i].getName()] = coinCounter
            
        }
        return result
    }
    const valueToString = (ammount) =>{
        var result = [];
        var ammountDec = new bigDecimal(ammount).round(2)
        for(var i=coinArray.length-1;i>=0;i--){
            var coinCounter = 0 
            var denomDec = new bigDecimal(coinArray[i].getDenom()).round(2)
            var value = ammountDec.compareTo(denomDec)
            while(true){
                if (value === -1){
                    break
                } else{
                    ammountDec = ammountDec.subtract(denomDec)
                    coinCounter += 1 
                    value = ammountDec.compareTo(denomDec)
                }
               
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
    const setValue = (newValue) => {value = newValue}
    const getValue = () => value;

    const toString = () => name + ": " + value.toString();

    return {name, revert, revalue, getValue, toString, setValue}
}

const bread = itemFactory("bread",2);
const ale = itemFactory("ale",4);
const cheese = itemFactory("cheese",10);

const items = [bread, ale, cheese]





 

export { coinFactory, currencyFacory, items, itemFactory, fantasy}


