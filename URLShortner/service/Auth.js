const sessionIDtousermap=new Map()

function setUser(id,user){
    sessionIDtousermap.set(id,user)
}
function getUser(id){
    return sessionIDtousermap.get(id)
}

module.exports={
    setUser,
    getUser
}