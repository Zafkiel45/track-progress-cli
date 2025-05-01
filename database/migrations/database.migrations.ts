import { database } from "../config/database.config";

database.run(`
  CREATE TABLE IF NOT EXISTS goals (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,  
    progress INTEGER NOT NULL DEFAULT 0,
    target INTEGER NOT NULL, 
    created_at DATE NOT NULL,
    failures INTEGER NOT NULL DEFAULT 0,
    last_failure DATE 
  )  
`);

