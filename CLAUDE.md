# Project Instructions

## Vercel Blob Upload

When uploading files to Vercel Blob storage, source the token from .env.local:

```bash
source .env.local && vercel blob put <filepath>
```

Or export the BLOB_READ_WRITE_TOKEN from .env.local before running vercel blob put.

## Distribution Files

- macOS installer: `distribution/VEX_MIDI_EXPRESSION_v<version>/VEX_MIDI_EXPRESSION_v<version>_macOS.pkg`
- Windows installer: `distribution/VEX_MIDI_EXPRESSION_v<version>/VEX_MIDI_EXPRESSION_v<version>_Windows.zip`
- Linux installer: `distribution/VEX_MIDI_EXPRESSION_v<version>/VEX_MIDI_EXPRESSION_v<version>_Linux.zip`

## Version Updates

When updating versions:
1. Update `src/lib/products.js` with new filenames
2. Upload new files to Vercel Blob using the command above
3. Commit and push changes to deploy
