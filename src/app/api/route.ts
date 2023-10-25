import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { sleep } from '~/app/_helpers/sleep'
import validate from '~/app/_helpers/validate'

const payloadSchema = Joi.object({
  status: Joi.number().min(100).max(600),
  delay: Joi.number().min(1).max(10000),
})

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams
    const { delay, status } = validate<{ status?: number; delay?: number }>(
      {
        status: query.get('status') ? Number(query.get('status')) : 200,
        delay: query.get('delay') ? Number(query.get('delay')) : undefined,
      },
      payloadSchema,
    )

    if (delay) {
      await sleep(delay)
    }

    return new Response(null, { status })
  } catch (error) {
    return NextResponse.json({ message: 'request failed' }, { status: 500 })
  }
}
