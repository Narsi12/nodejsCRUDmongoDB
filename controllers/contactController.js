const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
//@des get all contacts
//@route GET /api/contacts
//@acess public


const getContact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})


//@des create contact
//@route POST /api/contacts
//@acess public


const createContact = asyncHandler(async (req,res)=>{
    console.log("The request body is : ",req.body);
    const {name,email,phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json({"msg":contact})
})

//@des GET contact
//@route POST /api/contacts/:id
//@acess public


const getContactIndivudual = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json({"msg": contact})
})


//@des update contact
//@route PUT /api/contacts/:id
//@acess public


const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}

    )

    res.status(200).json({ "msg": updateContact });
    
})


//@des delete contact
//@route delete /api/contacts/:id
//@acess public


const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({"msg": contact});
});





module.exports = {
    getContact,
    createContact,
    getContactIndivudual,
    updateContact,
    deleteContact
}