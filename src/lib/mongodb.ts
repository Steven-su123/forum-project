import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = { maxPoolSize: 10 };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _globalClientPromise: Promise<MongoClient>;
}

if (!global._globalClientPromise) {
  client = new MongoClient(uri, options);
  global._globalClientPromise = client.connect();
}

clientPromise = global._globalClientPromise;

export default clientPromise;
