# Diagramma ER del database per il sistema di gestione del pronto soccorso
Questo diagramma rappresenta le tabelle principali e le loro relazioni nel database PostgreSQL utilizzato dal sistema di gestione del pronto soccorso.

```mermaid
erDiagram
%% ENTITÀ PRINCIPALI %%

    USERS {
        int id PK
        string username UK
        string password
        enum role "DOC, INF, AMM"
        timestamp created_at
    }

    PATIENTS {
        int id PK
        string codice_fiscale UK "Indice univoco"
        string nome
        string cognome
        date data_nascita
        string indirizzo_via
        string indirizzo_civico
        string comune
        string provincia
    }

    TRIAGE_COLORS {
        string code PK "Es. ROSSO"
        string display_name
        int priority "1=Max, 5=Min"
        string hex_value
    }

    ADMISSIONS {
        int id PK
        int patient_id FK
        string braccialetto UK "Es. 2023-0001"
        datetime data_ora_ingresso
        enum stato "ATT, VIS, OBI, RIC, DIM"
        string patologia_codice
        string codice_colore FK "Rif. a TRIAGE_COLORS"
        string modalita_arrivo
        text note_triage
        timestamp updated_at
    }

%% RELAZIONI %%

%% Un Paziente può avere N accessi al pronto soccorso nel tempo (storico)
    PATIENTS ||--o{ ADMISSIONS : "effettua"

%% Un Colore può essere assegnato a N accessi diversi
    TRIAGE_COLORS ||--o{ ADMISSIONS : "classifica"

%% NOTA: Gli utenti gestiscono il sistema ma in questa versione semplificata 
%% non c'è una Foreign Key diretta su chi ha creato l'ammissione (Audit log logico).
```
### Legenda delle Relazioni

1. **PATIENTS `1` -- `N` ADMISSIONS**
    - **Relazione:** Uno a Molti.
    - **Logica:** Un singolo paziente (identificato univocamente dal CF) può tornare al Pronto Soccorso più volte nel corso della sua vita. La tabella `admissions` tiene traccia dello storico di tutti questi accessi collegandoli allo stesso record anagrafico.
2. **TRIAGE_COLORS `1` -- `N` ADMISSIONS**
    - **Relazione:** Uno a Molti.
    - **Logica:** Il colore "ROSSO" (definito una sola volta in `triage_colors` con il suo esadecimale e priorità) può essere assegnato a infiniti accessi diversi. Se un domani decidi di cambiare l'esadecimale del rosso, lo cambi in un solo posto (`TRIAGE_COLORS`) e si aggiorna per tutti.
3. **USERS**
    - È un'entità "isolata" a livello di schema relazionale stretto (non ci sono Foreign Key che puntano a `users`), ma è fondamentale a livello applicativo per l'autenticazione e i permessi (Role-Based Access Control).
