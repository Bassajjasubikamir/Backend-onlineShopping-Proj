const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({ status: 200, data: users })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: `${err.message}` })
    }
};

const getOneUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const userExists = await prisma.user.findUnique({
            where: { id }
        })

        if (!userExists) {
            return res.status(404).json({ error: "Record does't exist" })

        }
        return res.status(200).json({ data: userExists })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400, error: `${err.message}` })
    }
}

        //getting data from user
const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, product } = req.body
        //check data is valid
        if (!name || !email || !phone || !password || !product) {
            return res.status(400).json({ status: 400, msg: "Missing or empty fields" })
        }
        //check if user exists

        const userExists = await prisma.user.findUnique({ where: { email } })

        if (userExists) {
            return res.status(400).json({ status: 400, msg: "Record already exists" })
        }
        //save to database
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password: hashedpassword,
                product: product.trim()
            }
        })
        res.status(201).json({ status: 201, data: newUser })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400, error: `${err.message}` })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const userExists = await prisma.user.findUnique({ where: { id } })

        if (!userExists) {
            return res.status(404).json({ error: "Record exist already" })
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: req.body,
        })
            return res
            .status(200)
            .json({ status: 200, msg: "Record updated", data: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400, error: `${err.message}` })
    }

}

const deleteUsers = async(req, res) => {
    const id = parseInt(req.params.id)
    const userExists = await prisma.user.findUnique({ where: { id } })

    if (!userExists) {
        return res.status(404).json({ error: "Record doesn't exist" })
    } 
    await prisma.user.delete({
        where:{id}
    })
    return res.status(200).json({status:200, msg:"Record deleted successfully" })
    }
module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUsers
} 