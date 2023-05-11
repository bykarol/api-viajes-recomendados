const getDB = require('../../db/db');

const postVotes = async (req,res)=> {

try{
    const { vote, comment, user_id, place_id } = req.body;
    const connect = await getDB();
    await connect.query(`USE travelexperience;`)
    const [userVote] = await connect.query(
        `INSERT INTO votes (vote, comment, user_id, place_id) VALUES (?,?,?,?)`,[vote, comment, user_id, place_id]
    );
    connect.release();
    res.status(200).send({
    status: "ok",
    message:"A successfully conducted vote",
    data: [userVote]

    })


}catch (err) {
    console.log(err);
    res.status(500).send(err);
}

}

module.exports = postVotes;
