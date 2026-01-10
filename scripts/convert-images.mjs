
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/sequence');
const outputDir = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

console.log(`Found ${files.length} PNG files. Starting conversion...`);

async function convertImages() {
    let completed = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

        try {
            await sharp(inputPath)
                .webp({ quality: 80, lossless: false }) // slightly lossy for better compression
                .toFile(outputPath);

            completed++;
            if (completed % 10 === 0) {
                console.log(`Converted ${completed}/${files.length} images...`);
            }
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
    console.log('Conversion complete!');
}

convertImages();
