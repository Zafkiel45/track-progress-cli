/*
  Useful if you already has some data on your database, without be formated.
  Once you execute this script, all names of the database will be formated to
  lowerCase without any white spaces. 

  All new notes will be created formatted. 
*/ 
import { database } from "./database/config/database.config";
import { formatTextForDatabase } from "./utils/goals.utils";

interface names {
  name: string;
};

(function formatNames() {
  try {
    const query = database.prepare(`SELECT name FROM goals`);
    const names = query.all() as names[];
   
    const unformattedNames = names.map((item) => item.name);
    const update = database.prepare(`UPDATE goals SET name = @updated WHERE name = @name`);

    const transaction = database.transaction((item) => {
      for(let name of item) {
        update.run({
          name: name,
          updated: formatTextForDatabase(name)
        })
      };
    });

    transaction(unformattedNames)

  } catch(err) {
    console.error(err);
  };
})()