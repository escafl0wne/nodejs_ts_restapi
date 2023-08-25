import Joi from "joi";

const createPostDto = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string(),
 

})



const updatePostDto = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})

export default {createPostDto,updatePostDto};