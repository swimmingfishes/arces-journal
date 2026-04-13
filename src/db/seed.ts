import 'dotenv/config'

import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const run = async (): Promise<void> => {
  const payload = await getPayload({ config })

  try {
    // Build a local Payload request so nested db operations share one request context.
    const req = await createLocalReq({}, payload)

    await seed({ payload, req })

    payload.logger.info('Seed command finished successfully.')
    process.exit(0)
  } catch (error) {
    payload.logger.error({ err: error, message: 'Seed command failed.' })
    process.exit(1)
  }
}

await run()
