import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(6),

})

const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})

export default { register, login };