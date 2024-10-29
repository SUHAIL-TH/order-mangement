import axios from "axios";


const api=axios.create({
    baseURL:"http://localhost:4000"

});


async function postSupplier(data) {
  try {
    const res = await api.post("/postsupplier", data)
    return res; 
  } catch (err) {
    console.error("API Error:", err);
    throw err; 
  }
}
async function supplierList() {
    try {
      const res = await api.get("/supplierlist")
      return res; 
    } catch (err) {
      console.error("API Error:", err);
      throw err; 
    }
  }
  async function addItem(data){
    try {
        const res=await api.post("/additem",data)
        return res
        
    } catch (error) {
        console.log(error)
        throw error;
    }
  }
  async function itemList() {
    try {
      const res = await api.get("/itemlist")
      return res; 
    } catch (err) {
      console.error("API Error:", err);
      throw err; 
    }
  }

  async function purchaseOrder(data){
    try {
      const res=await api.post("/addpurchaseorder",data)
      return res
      
    } catch (error) {
      throw err
    }
  }

  async function purchaseList(){
    try {
      const res=await api.post("/purchaselist",{})

      return res
      
    } catch (error) {
      console.log(error)
      throw err
    }
  }
export {postSupplier,supplierList,addItem,itemList,purchaseOrder,purchaseList}