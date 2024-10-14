type Transaction = {
    id:number,
    title:string,
    amount:number,
    type: "Expense" | "Income" | "Transfer",
    category:string,
    dateTime:string,
    fromAccount?:string|null,
    toAccount?:string|null
}
type Category = {
    id:number,
    name:string,
    type: "Expense" | "Income" | "Transfer",
    budgetSet:number
    budget:number
}
type Person = {
    id:number,
    name:string,
    balance:number
}