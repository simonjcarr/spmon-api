// import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

import { HttpContext } from "@adonisjs/core/http";

export default class UsersController {
    async authenticateUser({ auth, response }: HttpContext) {
        const user = await auth.use('web').authenticate()
        return response.status(200).json(user)
    }
    
    async registerUser({ request, response }: HttpContext) {
        const { email, password } = request.all()

        // If username or password is missing, return a 400 status code
        if (!email || !password) {
            return response.status(400).json({ message: 'Email and password are required' })
        }

        const user = await User.create({ email, password })
        return response.status(201).json(user)
    }

    async loginUser({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        const user = await User.verifyCredentials(email, password)

        await auth.use('web').login(user)

        return response.status(200).json(user)
    }
}