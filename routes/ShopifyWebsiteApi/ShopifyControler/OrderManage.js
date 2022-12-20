let saveOrderDataModel = require("../../../Models/Shopify/OrderDataStore");
let artistWalletModel = require("../../../Models/Shopify/ArtistWallet");

const saveOrderDetails = async (req,res)=> {
    try {

    let { line_items } = req.body;
    //console.log(line_items);
    let lengthOd = line_items.length;
      function wait_promise(venD, totalAmountUpdated){
          return new Promise((resolve, reject) => {
            let updateed =  artistWalletModel.findOneAndUpdate(venD, {Amount: totalAmountUpdated.toFixed(2)})
            updateed.exec()
            .then(result=>{
              resolve(result)
            })
            .catch(error=>{
              console.log(error);
            })
          })
      }  


    async function run() {
      for(var x  = 0; x < lengthOd; x++){
        let {vendor, price, quantity} = line_items[x];
        let venD = { VendorId:vendor }; 
        let findCureentVender = await artistWalletModel.find(venD);
        let { Amount } = await findCureentVender[0];
        let tolalQtyPlus = await Number(price) * Number(quantity);
        let subtractDiscount = await tolalQtyPlus * 10 / 100;
        let disPrice  =  await tolalQtyPlus - subtractDiscount;
        let totalAmountUpdated = await Number(disPrice) + Number(Amount);
        let a = await  wait_promise(venD, totalAmountUpdated); 
        console.log(x);
        console.log(a);
      }
    }
    run()
   // (async()=>{
        
    //     line_items.forEach(async (element, index) => {
    //         let {vendor, price, quantity} = element;
    //         let venD = { VendorId:vendor };
    //         await console.log(price, " * ", quantity);
    //          let findCureentVender = await artistWalletModel.find(venD);
    //          let { Amount } = await findCureentVender[0];
    //          let tolalQtyPlus = await Number(price) * Number(quantity);
    //          let subtractDiscount = await tolalQtyPlus * 10 / 100;
    //          let disPrice  =  await tolalQtyPlus - subtractDiscount;
    //          let totalAmountUpdated = await Number(disPrice) + Number(Amount);
    //          await console.log(disPrice);
             
    //         //let updateed = await artistWalletModel.findOneAndUpdate(venD, {Amount: totalAmountUpdated.toFixed(2)})
    //         console.log("**************");
    //         console.log(updateed);
    //         console.log("**************");

    //          if(index == lengthOd -1){
    //           console.log("send");
             
    //          }

    //     }) 
    // })();
        let filterData = line_items.map((element)=> {
          return {
            vendor: element.vendor,
            title:element.title,
            name: element.name,
            quantity: element.quantity,
            price: element.price,
            product_id: element.product_id,
            variant_id: element.variant_id,
            variant_title: element.variant_title,
            Date : new Date().toISOString().slice(0, 10)
          }
        })
      
         await saveOrderDataModel.insertMany(filterData);
      
        // console.log(filterData);
        
        res.status(200).json({
          status:200,
          message:"flag1"
        })


    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status:200,
            message:"flag1"
         })
    }
  }


  const deleteAllOrder = async (req,res)=>{
    await saveOrderDataModel.remove()
    res.status(200).json({
      status:200,
      message:"ok deleted"
    })
  }
  module.exports = {
    saveOrderDetails,
    deleteAllOrder
  }