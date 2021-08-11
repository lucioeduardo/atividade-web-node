import { cpf } from 'cpf-cnpj-validator'; 
import express from 'express'

const app = express()
app.use(express.json())

app.listen(3000, () => {
  console.log("Server Listening on localhost:3000...")
});

var history = []

app.post('/cpf/check/',  (req,res) => {
  const cpfValue = req.body.cpf
  
  const result = cpf.isValid(cpfValue) ? "Valido": "Invalido" 

  history.push({
    'cpf': cpfValue,
    'description': result
  });

  return res.status(200).json({
    'Resultado': result
  })
});

app.get('/cpf/return/', (req,res) => {
  return res.status(200).json(history)
});

app.get('/cpf/return/:cpf', (req,res) => {
  const cpfValue = req.params.cpf

  var result = history.filter((item) => item.cpf == cpfValue)

  return res.status(200).json(result)
});

app.put('/cpf/update/:cpf', (req,res) => {
  const cpfValue = req.params.cpf
  const {description} = req.body

  history = history.map((item) => item.cpf == cpfValue ? {
    'cpf': item.cpf,
    'description': description
  } : item)

  return res.status(200).json(history)
});

app.delete('/cpf/delete/:cpf', (req, res) => {
  const cpfValue = req.params.cpf

  history = history.filter((item) => item.cpf != cpfValue)

  return res.status(200).json()
});