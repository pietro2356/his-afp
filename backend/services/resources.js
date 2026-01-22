import {pool} from "./dbSession.js";

export const retrieveTriageColorsFn = async (req, res) => {
	try {
		// Ordiniamo per priorità (1 = Rosso = In cima)
		const result = await pool.query('SELECT * FROM triage_colors ORDER BY priority');
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
