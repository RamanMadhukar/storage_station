const mongoose = require('mongoose');

const ordSchema = new mongoose.Schema(
    {
        shipping_method:String,
        order_id:String,
        profile:String,
        fulfillment_status:String,
        order_number:String,
        shop_name:String,
        account_id:Number,
        partner_order_id:String,
        shipping_name:String,
        from_address:{
            name:String,
            company_name:String,
            address_1:String,
            address_2:String,
            email:String,
            city:String,
            state:String,
            zip:String,
            country:String,
            phone:String,
        },
        to_address:{
            name:String,
            company_name:String,
            address_1:String,
            address_2:String,
            email:String,
            city:String,
            state:String,
            zip:String,
            country:String,
            phone:String,
        },
        tracking_number:String,
        label:String,
        order_amount:Number,
        userId:String,
        createdAt:Date,
        updatedAt:Date,
        running_status:Number,
        t_delivery_date:Date,
        is_return:Boolean,
        t_return_date:Boolean,

    }
);

module.exports = mongoose.model('trackingmodel_tbl', ordSchema);