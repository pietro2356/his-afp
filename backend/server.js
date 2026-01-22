import express from 'express';
import cors from 'cors';
import client from 'prom-client';
import responseTime from "response-time";
import {authenticateTokenFn, loginFn} from "./services/auth.js";
import {retrieveTriageColorsFn} from "./services/resources.js";
import {retrieveHealthStatusFn} from "./services/health.js";
import {
  changeAdmissionsStatusByIDFn,
  insertNewAdmissionFn,
  retrieveActiveAdmissionsFn,
  retrieveAdmissionByIDFn
} from "./services/patients.js";
import {logger} from "./services/logger.js";

// --- CONFIGURAZIONE METRICHE (Prometheus) ---
client.collectDefaultMetrics(); // Raccoglie CPU, Memoria, Event Loop automaticamente

// Definiamo una metrica personalizzata: Istogramma dei tempi di risposta HTTP
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 10] // Fasce di tempo (0.1s, 0.3s...)
});

// --- CONFIGURAZIONE SERVER EXPRESS ---
const app = express();
const port = 3000;

// --- MIDDLEWARE GLOBALI ---
app.use(cors());
app.use(express.json());

// --- 3. MIDDLEWARE PER TRACCIARE LE METRICHE ---
// Questo middleware intercetta TUTTE le chiamate e registra quanto tempo impiegano
app.use(responseTime((req, res, time) => {
  if (req.path === '/metrics') return; // Ignoriamo la chiamata alle metriche stesse

  httpRequestDurationMicroseconds.labels(
      req.method,
      req.path, // In produzione meglio raggruppare gli ID (es. Usare una regex per sostituire numeri con :id)
      res.statusCode
  ).observe(time / 1000); // response-time restituisce ms, Prometheus vuole secondi

  // Loggiamo anche l'evento
  logger.info(`Request handled`, {
    method: req.method,
    url: req.path,
    status: res.statusCode,
    duration_ms: time
  });
}));

// --- ENDPOINT PER LE METRICHE ---
// Prometheus chiamerà questo indirizzo ogni 5-15 secondi
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

// --- HEALTH CHECK ---
app.get('/health', retrieveHealthStatusFn);

// --- API ENDPOINTS ---
// 1. LOGIN
app.post('/auth/login', loginFn);

// 2. CONFIGURAZIONE: LISTA COLORI TRIAGE
app.get('/resources/triage-colors', authenticateTokenFn, retrieveTriageColorsFn);

// 3. LISTA PAZIENTI ATTIVI (Stato != DIM)
app.get('/admissions', authenticateTokenFn, retrieveActiveAdmissionsFn);

// 4. DETTAGLIO PAZIENTE
app.get('/admissions/:id', authenticateTokenFn, retrieveAdmissionByIDFn);

// 5. INSERIMENTO PAZIENTE (Nuovo Accesso)
app.post('/admissions', authenticateTokenFn, insertNewAdmissionFn);

// 6. CAMBIO STATO
app.patch('/admissions/:id/status', authenticateTokenFn, changeAdmissionsStatusByIDFn);

// Avvio Server
app.listen(port, () => {
  logger.info(`SIO Backend in ascolto sulla porta ${port}`);
});
