import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

const outputDir = path.join(process.cwd(), 'public', 'generated-cats')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, filename } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1024x1024',
    })

    const imageBase64 = response.data[0].base64
    const buffer = Buffer.from(imageBase64, 'base64')

    const outputFile = filename || `cat-${Date.now()}.png`
    const outputPath = path.join(outputDir, outputFile)
    fs.writeFileSync(outputPath, buffer)

    return NextResponse.json({
      success: true,
      imageUrl: `/generated-cats/${outputFile}`,
      prompt: prompt,
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
