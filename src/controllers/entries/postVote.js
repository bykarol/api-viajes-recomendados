const getDB = require('../../db/db');

const postVotes = async (req, res) => {

    let connect;
    try {
        connect = await getDB();
        const { vote, comment, place_id } = req.body;
        const [userVote] = await connect.query(
            `INSERT INTO votes (vote, comment, user_id, place_id) VALUES (?,?,?,?)`, [vote, comment, req.userInfo.id, place_id]
        );
        res.status(200).send({
            status: "ok",
            message: "A successfully conducted vote",
            result: userVote
        });


    } catch (err) {

        res.status(500).send(err.message);
    } finally {
        if (connect) connect.release();
    }

}

module.exports = postVotes;
