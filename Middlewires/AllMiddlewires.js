import UserModals from "../Modals/User.Modals.js";

export const checkUserId = async (req, res, next) => {

    try {
        const {id} = req.body;
        const user = await UserModals.findById(id);

        if(user){
            next();
        }
        else{
            return res.status(404).json({success: false, message:'id not found'})
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}