import express from 'express';
import { Book } from "../models/bookmodel.js";

const router = express.Router();


    // Route for post/Save new book record

    router.post('/', async (request, response) => {
    try{
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear)
        {
            return response.status(400).send({message: 'Send all requirecd fields title, author, publishYear'});
        }
        
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear
        }
    
        const book = await Book.create(newBook)
    
        return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
    });
    
    // Route for get all book records
    
    router.get('/', async(request,response)=>{
        try{
            const books = await Book.find({});
            return response.status(200).json({
                Count:books.length,
                data:books
            });
        }
        catch(error){
            console.log(error.message);
            return response.status(500).send({message:error.message})
        }
    });
    
    
    // Route for get one book record
    
    router.get('/:id', async(request,response)=>{
        try{
            const { id } = request.params;
            const book = await Book.findById(id);
            return response.status(200).json({book});
        }
        catch(error){
            console.log(error.message);
            return response.status(500).send({message:error.message})
        }
    });
    
    // Route for update book
    
    router.put('/:id', async(request, response) => {
    
        try{
    
            if(!request.body.title ||
                !request.body.author ||
                !request.body.publishYear)
            {
                return response.status(400).send({message: `Send all required field title, author, publishYear`
            });
            }
            const { id } = request.params;
            const result = await Book.findByIdAndUpdate(id, request.body)
    
            if(!result)
            {
                return response.status(404).send({message:'book not found'})
            }
           
            return response.status(400).send({message:'book updated succesfully'})
        }
        catch(error){
            console.log(error.message)
            return response.status(500).send({message:error.message})
        }
    });
    
    // Route for delete book
    
    router.delete('/:id', async (request, response)=> {
    
        try{
            const { id } = request.params;
            const result = await Book.findByIdAndDelete(id);
            if(!result)
            {
            return response.status(404).send({message:'Book Not deleted'});
            }
            return response.status(200).send({message:'Book deleted Succesfully'});
        }
    
        catch(error){
            console.log(error.message);
            return response.status(500).send({message:error.message})
        }
    
    });

    export default router;
    