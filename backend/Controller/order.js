const trackingmodel_tbl = require('../Database/order')

exports.data = async (req, res) => {

    var totalCount = await trackingmodel_tbl.find({}).count();
    var filter1 = await trackingmodel_tbl.aggregate([
        {
            $group: {
                _id: {
                    shipping_method: "$shipping_method",

                }
            }
        }]);

    var filter2 = await trackingmodel_tbl.aggregate([
        {
            $group: {
                _id: {
                    fulfillment_status: "$fulfillment_status"

                }
            }
        }]);

    res.json({
        totalCount,
        filter1,
        filter2

    })


}

exports.pageCount = async (req, res) => {
    const { shipProvider, status, startDate, endDate } = req.body;
    var pagenumber = req.body.pagenumber;
    var perPage = 20;

    if (shipProvider == '' && status == '' && startDate == '' && endDate == '') {

        var allRecord = await trackingmodel_tbl.find({}).skip(pagenumber * perPage).limit(perPage).sort({ createdAt: -1 })
        console.log("first route");
        return res.json(allRecord);

    }

    else {
        var searchRecords

        if (shipProvider !== '') {
            var searchWord = new RegExp(shipProvider, 'i')
            searchRecords = await trackingmodel_tbl.find({ shipping_method: searchWord }).skip(pagenumber * perPage).limit(perPage).sort({ createdAt: -1 })


        }

        else if (shipProvider !== '' && status !== '') {
            var shipP = new RegExp(shipProvider, 'i')
            var stat = new RegExp(status, 'i')
            searchRecords = await trackingmodel_tbl.find({
                shipping_method: shipP,
                fulfillment_status: stat
            }).skip(pagenumber * perPage).limit(perPage).sort({ createdAt: -1 })
        }

        else if (shipProvider !== '' && status !== '' && startDate !== '') {
            var shipP = new RegExp(shipProvider, 'i')
            var stat = new RegExp(status, 'i')
            searchRecords = await trackingmodel_tbl.find({
                shipping_method: shipP,
                fulfillment_status: stat,
                createdAt: { $regex: { $gte: startDate } }
            }).skip(pagenumber * perPage).limit(perPage).sort({ createdAt: -1 })
        }

        else if (shipProvider !== '' && status !== '' && startDate !== '' && endDate !== '') {
            var shipP = new RegExp(shipProvider, 'i')
            var stat = new RegExp(status, 'i')
            searchRecords = await trackingmodel_tbl.find({
                shipping_method: shipP,
                fulfillment_status: stat,
                createdAt: { $regex: { $gte: startDate, $lt: endDate } }
            }).skip(pagenumber * perPage).limit(perPage).sort({ createdAt: -1 })
        }

        return res.json(searchRecords);

    }




}