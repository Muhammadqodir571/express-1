const express = require('express')
const { v4 } = require('uuid')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false}))
const books =[
    {
        id:1,
        name:'otkan kunlar',
        author:'otkir xoshimov'
    }
]
 
app.get('/api',(req,res)=>{
    res.send(books)
})
app.post('/api', (req,res) => {
    const book ={
        id:v4(),
        name:req.body.name,
        author:req.body.author
    }
    

    books.push(book)
    res.status(201).send(book)
})


app.get('/api/:id', (req,res) => {
    const bookID=books.find( b =>b.id===parseInt(req.params.id))
    if(!bookID)
   return res.status(404).send('berilgan id notogri')
    res.send(bookID)
})
app.put('/api/:id', (req,res) => {
    //kitobni bazadan izlab topish
    //agar kitob mavjud bolsa 404 qaytarish
    const book=books.find(b =>b.id===parseInt(req.params.id))
    if(!book)
    return res.send('kitob topilmadi');

    //kitobni yangilash
    book.name=req.body.name
    //yabngilangan kitobni qaytarish
    res.send(book)

})
app.delete('/api/:id',(req,res)=>{
    //kitobni bazadan izlab topish
    //agar kitob mavjud bolsa 404 qaytarish
const book =books.find(b =>b.id===parseInt(req.params.id))

if(!book)
return res.send('kitob topilmadi')
//u topilsa ochiramiz
const bookIDINdex=books.indexOf(book);
books.splice(bookIDINdex, 1);
//topilgan kitobni qaytaramiz
res.send(book)

})

const PORT= process.env.PORT || 4000;

app.listen(PORT, ()=>{
    `server run on the ${PORT}`
})
