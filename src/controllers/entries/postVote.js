const getDB = require('../../db/db');

const postVotes = async (req, res) => {

    try {
        const { vote, comment, place_id } = req.body;
        const connect = await getDB();
        const [userVote] = await connect.query(
            `INSERT INTO votes (vote, comment, user_id, place_id) VALUES (?,?,?,?)`, [vote, comment, req.userInfo.id, place_id]
        );
        connect.release();
        res.status(200).send({
            status: "ok",
            message: "A successfully conducted vote",
            result: userVote
        });


    } catch (err) {

        res.status(500).send(err.message);
    }

}

module.exports = postVotes;
