const router = require("express").Router();
const { AdmissionForm } = require('../models')

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function currentDate(){
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'-'+dd+'-'+yyyy;
    return today;
}

// To add a new pitch to the investors by the entrepreneurs
router.post('/', async (req, res, next) => {
    try {
        const { name, age, batch} = req.body;
        const numOfparams = Object.keys(req.query).length;
        // Edge case where number of parameters in the request body are not equal to 3
        if(Object.keys(req.body).length !== 3){
            return res.status(400).json({ msg: "Pass required params" })
        }
        // Number of body parameters might be 3 but are different than the required ones
        else if(name == null || age == null ||  batch == null){
            return res.status(400).json({ msg: "Wrong parameters" })
        }
        // Validation of the parameters
        // Age should be between 18 and 65
        // Name should not be empty
        else if(name == "" || age < 18 || age > 65){
            return res.status(400).json({ msg: "Values not correct" })
        }
        // The type of the parameters to be validated
        else if(typeof name !== 'string' || !isInt(batch) || !isInt(age)){
            return res.status(400).json({ msg: "Validation error" })
        }
        else{

            const today = currentDate()

            // Add recently added employee in the table
            const employeeadded = await AdmissionForm.create({
                name: name,
                age: age,
                batch: batch,
                fees: false, // initially fees not paid
                joining: today
            })
            return res.status(201).json({ msg : "employee added",  employeeadded})
        }
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});


// to pay the fees
router.put('/payment', async (req, res, next) => {
    try {
        const { id } = req.body;

        const curremployee = await AdmissionForm.findOne({ where: { id: id } })

        if(curremployee == null){
            return res.status(400).send({ msg: "employee does not exist" })
        }
        else if(curremployee.fees == true){
            return res.status(400).send({ msg: "fees already paid" })
        }
        else{
            await AdmissionForm.update({ fees: true }, {
                where: {
                    id: id
                }
            });
            return res.status(200).json({ msg: 'fees paid by employee' })
        }
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

module.exports = router;