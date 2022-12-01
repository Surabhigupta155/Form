const router = require("express").Router();
const { Pitches, CounterOffers } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = req.body;
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ "msg": "Body is empty" })
        }
        else if(entrepreneur == null || pitchTitle == null ||  pitchIdea == null || askAmount == null || equity == null){
            return res.status(400).json({ "msg": "Wrong parameters" })
        }
        else if(entrepreneur == "" || equity > 100){
            return res.status(400).json({ "msg": "Values not correct" })
        }
        else{
            const lastrow = await Pitches.findOne({
                order: [ [ 'id', 'DESC' ]],
            });
            var stringid = 0
            if(lastrow == null){
                stringid = "0"
            }
            else stringid = lastrow.id
            var numid = parseInt(stringid)
            numid++;
            const pitchadded = await Pitches.create({
                id: numid,
                entrepreneur: entrepreneur,
                pitchTitle: pitchTitle,
                pitchIdea: pitchIdea,
                askAmount: askAmount,
                equity: equity,
                offers: []
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
        
        const allPitches = await Pitches.findAll(
            {attributes: ['id', 'entrepreneur', 'pitchTitle', 'pitchIdea', 'askAmount', 'equity', 'offers']}
            );
        allPitches.sort((a, b) => { return a.id < b.id?1:-1 } )
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
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ "msg": "Body is empty" })
        }
        else if(investor == null || amount == null ||  equity == null || comment == null){
            return res.status(400).json({ "msg": "Wrong parameters" })
        }
        else if(investor == "" || equity > 100){
            return res.status(400).json({ "msg": "Values not correct" })
        }
        else{
            const topitch = await Pitches.findOne({ where: { id: pitch_id } });
            if(topitch == null){
                return res.status(404).json({"msg": "Pitch not found"})
            }
            else{
                const lastrow = await CounterOffers.findOne({
                    order: [ [ 'id', 'DESC' ]],
                    });
                var stringid = 0
                if(lastrow == null){
                    stringid = "0"
                }
                else stringid = lastrow.id
                var numid = parseInt(stringid)
                numid++;
                const counterofferadded = await CounterOffers.create({
                    id: numid,
                    investor: investor,
                    amount: amount,
                    equity: equity,
                    comment: comment
                })
                var totaloffers = topitch.offers
                // console.log("-------------", totaloffers)
                totaloffers.push(counterofferadded)
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
        const singlepitch = await Pitches.findOne({ where: { id: _id } , attributes: ['id', 'entrepreneur', 'pitchTitle', 'pitchIdea', 'askAmount', 'equity', 'offers']})
        if(singlepitch == null){
            return res.status(404).json({"msg": "Pitch not found"})
        }
        return res.status(200).json(singlepitch)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

module.exports = router;