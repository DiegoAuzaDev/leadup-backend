
const addresValidation = require("../../utils/googleMaps");

const address = async ()=>{
    let testAddress = "Carrera 1H # 6 -14, Neiva - Huila"
    let region = "CO"
    let response = await addresValidation.googleMapValidation(testAddress, region)
    console.log(response);
}

address();