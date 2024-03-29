const denominationArr = [ 100, 20, 10, 5, 1, .25, .10, .05, .01]

function checkCashRegister(price, cash, cid) {
    const cashDue = Number((cash-price).toFixed(2))
    let cidTotal = Number(cid.map(i => i[1]).reduce((a,b)=> a+b).toFixed(2))
    let changeDue = Number(cash - price)  
    let cidCopy = [...cid].reverse()
    const resultArr = []
    let currentChange = 0

  if(cidTotal < changeDue) {
    console.log({status: "INSUFFICIENT_FUNDS", change: []});
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (cidTotal === changeDue) {
    console.log({status: "CLOSED", change: cid});
    return {status: "CLOSED", change: cid};
  } else {

    for(let i = 0; i < denominationArr.length; i++) {     

    let denomination = denominationArr[i]
    let denominationTotal = Number(cidCopy[i][1])
    let availableNumBills = Math.floor(denominationTotal/denomination)
    let availableValue = availableNumBills*denomination
    let availChange = Math.floor(denominationTotal/changeDue)*denomination
      
    if(changeDue > denomination && changeDue > denominationTotal) {
        if((changeDue - availableValue) > 0) {
            resultArr.push([cidCopy[i][0], availableValue])
            changeDue -= availableValue
            changeDue = Number(changeDue.toFixed(2))
            currentChange += availableValue
            currentChange = Number(currentChange.toFixed(2))
        } else {
            resultArr.push([cidCopy[i][0], 
              ((Math.floor((changeDue)/denomination))*denomination)])
            
            changeDue -= denomination*(Math.floor(changeDue/denomination))
            changeDue = Number(changeDue.toFixed(2))
            currentChange += denomination*(Math.floor(changeDue/denomination))
            currentChange = Number(currentChange.toFixed(2))  
        }
    } else if(changeDue > denomination && changeDue < denominationTotal) {
        if(changeDue - availChange > 0) {
            resultArr.push([cidCopy[i][0], availChange])
            changeDue -= availChange
            changeDue = Number(changeDue.toFixed(2))
            currentChange += availChange
            currentChange = Number(currentChange.toFixed(2))
        } else {
            resultArr.push([cidCopy[i][0], 
              ((Math.floor((changeDue)/denomination))*denomination)])

            changeDue -= denomination*(Math.floor(changeDue/denomination))
            changeDue = Number(changeDue.toFixed(2))
            currentChange += denomination*(Math.floor(changeDue/denomination))
            currentChange = Number(currentChange.toFixed(2))
              }      
          }     
    }
    if(cashDue != (Number(resultArr.map(i => i[1]).reduce((a,b)=>a+b).toFixed(2)))) {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    } else {
      return {status: "OPEN", change: resultArr}
    } 
  }      
}  

