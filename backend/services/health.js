import {pool} from "./dbSession.js";

export const retrieveHealthStatusFn = async (req, res) => {
	try {
		await pool.query('SELECT 1');
		res.json({
			status: 'UP',
			database: 'CONNECTED',
			timestamp: new Date().toISOString(),
			uptime: process.uptime()
		});
	} catch (err) {
		res.status(503).json({
			status: 'DOWN',
			database: 'DISCONNECTED',
			error: err.message
		});
	}
}
