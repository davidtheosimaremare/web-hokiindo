import { getPayload } from "payload";
import configPromise from "./payload.config.ts";

async function run() {
  const payload = await getPayload({ config: configPromise });
  const media = await payload.find({ collection: 'media', limit: 1 });
  console.log(JSON.stringify(media.docs[0], null, 2));
}
run();
