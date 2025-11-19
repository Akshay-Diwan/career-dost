export const allMessages = new Map()

export function insertMessage(id: string, message: string) {
    if(!allMessages.has(id))  allMessages.set(id, [message]);
    else allMessages.get(id).push(message);
}    
export function addCommunity(id: string){
    if(allMessages.has(id)){
        console.log("Already joined the community")
        return;
    }
    allMessages.set(id, []);
    console.log("added community");
}