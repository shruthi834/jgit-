import { createPool, Pool } from "mysql";


let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    pool = createPool({
      connectionLimit: 4,
      host: "localhost",
      user: "root",
      password: "rupagowda834#",
      database: "nodews",
      port: 3306,
    });

    console.debug("MySql Adapter Pool generated successfully");
  } catch (error) {
    console.error("[mysql.connector][init][Error]: ", error);
    throw new Error("failed to initialized pool");
  }
  return pool;
};
export default init;

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error("Pool was not created. Ensure pool is created when running the app.");

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};
