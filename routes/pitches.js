const router = require("express").Router();
const { Pitches, CounterOffers } = require('../models')

// To add a new pitch to the investors by the entrepreneurs
router.post('/', async (req, res, next) => {
    try {
        const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = req.body;
        const numOfparams = Object.keys(req.query).length;
        // Edge case where number of parameters in the request body are not equal to 5
        if(Object.keys(req.body).length !== 5){
            return res.status(400).json({ "msg": "Pass required params" })
        }
        // Edge case where the request body is empty
        else if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ "msg": "Body is empty" })
        }
        // Number of body parameters might be 5 but are different than the required ones
        else if(entrepreneur == null || pitchTitle == null ||  pitchIdea == null || askAmount == null || equity == null){
            return res.status(400).json({ "msg": "Wrong parameters" })
        }
        // Validation of the parameters
        // Equity is in percentage so should be between 0 and 100
        // Entrepreneur name should not be empty
        // Asked amount should not be less than 0
        else if(entrepreneur == "" || equity > 100 || equity < 0 || askAmount < 0){
            return res.status(400).json({ "msg": "Values not correct" })
        }
        // The type of the parameters to be validated
        else if(typeof entrepreneur !== 'string' || typeof pitchTitle !== 'string' || typeof pitchIdea !== 'string' || typeof askAmount === 'string' || typeof equity === 'string'){
            return res.status(400).json({ "msg": "Validation error" })
        }
        else{
            // Taken the unique id as one plus the id of the last pitch added
            const lastrow = await Pitches.findOne({
                order: [ [ 'id', 'DESC' ]],
            });
            var stringid = 0
            // If no pitch is there in the table
            if(lastrow == null){
                stringid = "0"
            }
            else stringid = lastrow.id
            var numid = parseInt(stringid)
            numid++;
            // Add recently created pitch in the table
            const pitchadded = await Pitches.create({
                id: numid,
                entrepreneur: entrepreneur,
                pitchTitle: pitchTitle,
                pitchIdea: pitchIdea,
                askAmount: askAmount,
                equity: equity,
                offers: [] // Initially no counter offer by investor to the pitch
            })
            return res.status(201).json({ "id":String(numid) })
        }
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/', async (req, res, next) => {
    try {
        // To fetch all the pitches by all the entreprenuers   
        const allPitches = await Pitches.findAll(
            {attributes: ['id', 'entrepreneur', 'pitchTitle', 'pitchIdea', 'askAmount', 'equity', 'offers']}
            );
        // Displaying in reverse chronological order
        allPitches.sort((a, b) => { return parseInt(a.id) < parseInt(b.id)?1:-1 } )
        return res.status(200).json(allPitches)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.post('/:pitch_id/makeOffer', async (req, res, next) => {
    const pitch_id = req.params.pitch_id;
    const { investor, amount, equity, comment } = req.body;
    try {
        // Edge case where number of parameters in the request body are not equal to 4
        if(Object.keys(req.body).length !== 4){
            return res.status(400).json({ "msg": "Pass required params" })
        }
        // Edge case where the request body is empty
        else if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ "msg": "Body is empty" })
        }
        // Number of body parameters might be 4 but are different than the required ones
        else if(investor == null || amount == null ||  equity == null || comment == null){
            return res.status(400).json({ "msg": "Wrong parameters" })
        }
        // Validation of the parameters
        // Equity is in percentage so should be between 0 and 100
        // Investor name should not be empty
        // Counter amount should not be less than 0
        else if(investor == "" || equity > 100 || equity < 0 || amount < 0){
            return res.status(400).json({ "msg": "Values not correct" })
        }
        // The type of the parameters to be validated
        else if(typeof investor !== 'string' || typeof amount === 'string' || typeof equity === 'string' || typeof comment !== 'string'){
            return res.status(400).json({ "msg": "Validation error" })
        }
        else{
            const topitch = await Pitches.findOne({ where: { id: pitch_id } });
            // pitch not found for non existing id passed
            if(topitch == null){
                return res.status(404).json({"msg": "Pitch not found"})
            }
            else{
                // Taken the unique id as one plus the id of the last offer added
                const lastrow = await CounterOffers.findOne({
                    order: [ [ 'id', 'DESC' ]],
                    });
                var stringid = 0
                // If no offer is there in the table
                if(lastrow == null){
                    stringid = "0"
                }
                else stringid = lastrow.id
                var numid = parseInt(stringid)
                numid++;
                // Add recently created offer in the table
                const counterofferadded = await CounterOffers.create({
                    id: numid,
                    investor: investor,
                    amount: amount,
                    equity: equity,
                    comment: comment
                })
                // Getting the recently added offers in a variable with the keys only required
                const recentoffer = await CounterOffers.findOne({
                    order: [ [ 'id', 'DESC' ]], attributes: ['id', 'investor', 'amount', 'equity', 'comment']
                });
                // Get the offers of a the pitch that the investor is going to invest in
                var totaloffers = topitch.offers
                // Add the recent offer made in the array
                totaloffers.push(recentoffer)
                // Add the updated offers list for the particular pitch in the pitch table
                await Pitches.update({ id: topitch.id,
                    entrepreneur: topitch.entrepreneur,
                    pitchTitle: topitch.pitchTitle,
                    pitchIdea: topitch.pitchIdea,
                    askAmount: topitch.askAmount,
                    equity: topitch.equity,
                    offers: totaloffers
                    }, {
                    where: {
                        id: pitch_id
                    }
                });
                return res.status(201).json({ "id":String(numid) })
            }
        }
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/:id', async (req, res, next) => {
    const _id = req.params.id;
    try {
        // To fetch a pitch with a particular id
        const singlepitch = await Pitches.findOne({ where: { id: _id } , attributes: ['id', 'entrepreneur', 'pitchTitle', 'pitchIdea', 'askAmount', 'equity', 'offers']})
        // pitch not found for non existing id passed
        if(singlepitch == null){
            return res.status(404).json({"msg": "Pitch not found"})
        }
        else return res.status(200).json(singlepitch)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

module.exports = router;