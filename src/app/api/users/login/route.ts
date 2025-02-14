import { connect } from '@/dbConfig/dbConfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()


export async function POST (request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        if(!email || !password){
            return NextResponse.json({error:"All fields are required"},{status:400})
        }

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"user not found"},{status:404})
        }

        const validPassword =await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }


        //create token data

        const tokenData = {
            _id:user._id,
            username:user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        //settig it into secure cookies


        const response = NextResponse.json({
            message:"Login Successfull",
            success:true
        })


        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}