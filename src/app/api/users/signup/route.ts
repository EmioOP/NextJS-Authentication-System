import { connect } from '@/dbConfig/dbConfig'
import User from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'


connect()



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log(username,email,password)

        if (!email || !username || !password) {
            return NextResponse.json(
                { error: "all fields are required" },
                { status: 400 }
            )
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existedUser) {
            return NextResponse.json({error:"User already exists"})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        // creating user

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        console.log(user)

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email
            }
        },{status:201})


    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}