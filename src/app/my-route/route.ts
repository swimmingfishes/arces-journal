import configPromise from '@payload-config'

export const GET = async (_request: Request) => {
  await configPromise

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
