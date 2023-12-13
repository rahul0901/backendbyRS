// For successful registration user must register with unique email id and phone number.. else you can't create an account..

import UserModals from "../Modals/User.Modals.js";
import bcyrpt from 'bcrypt';
import JWT from 'jsonwebtoken';


export const Login = async (req, res) => {
    try {

        const { userKaEmail, userKaPassword } = req.body.login;
        console.log(req.body, 'req body login')

        if (!userKaEmail || !userKaPassword) return res.status(401).json({ success: false, message: 'all field required' })

        const user = await UserModals.findOne({ email: userKaEmail })

        // , password:userKaPassword

        if (!user) return res.status(401).json({ success: false, message: 'email not found..' })

        const isPassCorrect = await bcyrpt.compare(userKaPassword, user.password)

        if (!isPassCorrect) return res.status(401).json({ success: false, message: 'Password not matched..' })

        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET)

        // console.log(token, 'token')

        return res.status(200).json({ success: true, message: 'Logged in Successfully..', user: { name: user.name, id: user._id }, token })

        // above we added user in json object to get particular users name and id..


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const Register = async (req, res) => {
    try {

        const { userKaName, userKaEmail, userKaPassword, userKaNumber } = req.body.userData;

        console.log(req.body, 'req body registered')

        if (!userKaName || !userKaEmail || !userKaPassword || !userKaNumber) return res.status(401).json({ success: false, message: 'all fields required..' })

        const emailPresent = await UserModals.findOne({ email: userKaEmail });

        if (emailPresent) return res.status(401).json({ success: false, message: 'your email is already used..' })

        const numberPresent = await UserModals.findOne({ number: userKaNumber });

        if (numberPresent) return res.status(401).json({ success: false, message: 'your number is already registered..' })

        const hashPassword = await bcyrpt.hash(userKaPassword, 10)
        // console.log(hashPassword)

        const user = new UserModals({
            name: userKaName,
            email: userKaEmail,
            password: hashPassword,
            number: userKaNumber
        })

        await user.save();

        return res.status(200).json({ success: true, message: 'Register Success' })

    } catch (error) {

        return res.status(500).json({ success: false, message: error.message })

    }
    // res.send('Register Here')
}

export const getCurrentUser = async (req, res) => {
    try {

        // const { id } = req.body;

        // console.log(req.body, 'req.body of id')

        // first we used id to catch/target current user now we have implemented token jwt token which in future we will store in localstorage memory which will help us to store users info and user will always be logged in until logout himself from the website because this token will always be present  

        const { token } = req.body;

        if (!token) return res.status(401).json({ success: false, message: 'token is required' })

        const { id } = await JWT.verify(token, process.env.JWT_SECRET)

        // if (!id) return res.status(401).json({ success: false, message: 'id is required..' })

        const user = await UserModals.findById(id);

        if (!user) return res.status(401).json({ success: false, message: 'id not found' })

        return res.status(200).json({ success: true, message: 'user id found..', user: { name: user.name, id: user._id } })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'user api not running', message: error.message })
    }
}