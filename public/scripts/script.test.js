
const computeChannelName = require("./script")

test("Asigning a channel from database", ()=>{
      
        const test = computeChannelName(
            [{
                _id:"1",
                channels:[{
                    u1 : true,
                    u2 : true,
                    name : "vidchat1"
                },{
                    u1 : false,
                    u2 : true,
                    name : "vidchat2" 
                }]
            }] 
        )
        expect(test).toBe("vidchat2")
})