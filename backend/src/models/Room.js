import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
{
    roomId:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    files:{
        type:mongoose.Schema.Types.Mixed,
        default: () => ({
            "main.ts": {
                language: "typescript",
                content: ""
            }
        })
    }
},
{
    timestamps:true
});

export default mongoose.model("Room", roomSchema);