import bcrypt from 'bcryptjs';
import {pool} from "./dbSession.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {logger} from "./logger.js";

// Chiave Segreta per JWT
const JWT_SECRET = process.env.NODE_ENV === 'production'
	? (process.env.JWT_SECRET || 'super-secret-production-key')
	: crypto.randomBytes(64).toString();

const isAuthDisabled = process.env.AUTH_ENABLED === 'false';

// Middleware per verificare il Token JWT
export const authenticateTokenFn = (req, res, next) => {
	// Se l'autenticazione è disabilitata, saltiamo la verifica
	if (isAuthDisabled) {
		return next();
	}

	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1]; // Bearer TOKEN

	if (!token) return res.sendStatus(401);

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

export const loginFn = async (req, res) => {
	const { username, password } = req.body;
	try {
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
		if (result.rows.length === 0) return res.status(400).json({ error: "Utente non trovato" });

		const user = result.rows[0];

		// Bcrypt confronta la password in chiaro con l'hash nel DB (che ora è standard $2a$...)
		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) return res.status(400).json({ error: "Password errata" });

		const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.json({
			token,
			user: { username: user.username, role: user.role }
		});
	} catch (err) {
		logger.error("Errore durante il login", { error: err.message });
		res.status(500).json({ error: err.message });
	}
}
