const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const getDayDate = (dateStr:string) : string => {
    let dateTime = new Date(dateStr);
    let month = months[dateTime.getMonth()], date = dateTime.getDate(), day = weekDays[dateTime.getDay()];
    return `${month} ${date}, ${day}`
}

export const getDateTime = (dateStr:string) : string => {
    let dateTime = new Date(dateStr);
    return `${months[dateTime.getMonth()]} ${dateTime.getDate()}, ${dateTime.getFullYear()} ${dateTime.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })}`
}

export const getAmount = (amount : number) : string => {
    const amountStr = Math.abs(amount).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    })
    return amount >= 0 ? amountStr : '- ' + amountStr; 
}