import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token,newPassword} = reqBody
    
        if(!token || !newPassword){
            return NextResponse.json({error:"Invalid token or password"},{status:400})
        }
    
        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpry:{$gt:Date.now()}})
    
        if(!user){
            return NextResponse.json({error:"Token expired or user not found"},{status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)
    
        if(!hashedPassword){
            return NextResponse.json({error:"Unable to encrypt password"},{status:500})
        }
        console.log("User: ",user)
    
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpry = undefined
        const modifiedUser =  await user.save()
        console.log("password changed:",modifiedUser)

        return NextResponse.json({
            message:"Password Reset successfull",
            success:true
        })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
        
    }


}