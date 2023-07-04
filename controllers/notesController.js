
const notesModel = require("../models/Notes");




const addNotes = async (req,res)=> {

    try {

        const {title, description, tag} = req.body;

    }
    catch (err) {



    }
   

}
const fetchNotes = async (req,res)=> {


    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    }
    catch (err){
        console.log(error.message);
        res.send(500).send("Internal Server Error");
    }
}