# VEX MIDI EXPRESSION - REAPER Setup Guide

This guide explains how to use VEX MIDI EXPRESSION in REAPER to transform your MIDI controller data.

---

## REAPER's Flexible FX Chain

**Great news!** REAPER has one of the most flexible plugin architectures of any DAW. Tracks are "anything tracks" - you can put any combination of MIDI effects, instruments, and audio effects on the same track.

VEX can be placed directly before your instrument in the FX chain, and MIDI flows through automatically. No complex routing required!

---

## How It Works

In REAPER, FX are processed **top to bottom** in the FX chain. Place VEX above your instrument:

```
FX Chain (top to bottom):
   ↓
[VEX MIDI EXPRESSION]  ← MIDI Effect
   ↓
[Virtual Instrument]    ← Synth/Sampler
   ↓
[Audio Effects...]      ← Optional
   ↓
Track Output
```

---

## Setup Guide

### Step 1: Create a Track

1. Right-click in the track area and select **Insert new track** (or press Cmd+T / Ctrl+T)
2. Name the track by double-clicking the track name

### Step 2: Open the FX Chain

1. Click the **FX button** on the track (or press F on the selected track)
2. The FX browser window opens

### Step 3: Add VEX to the FX Chain

1. In the FX browser, search for "VEX"
2. Find **VEX MIDI EXPRESSION** under:
   - **VST3** (Windows/Mac/Linux)
   - or **AU** / Audio Units (Mac only)
3. Double-click to add it to the FX chain

### Step 4: Add Your Instrument

1. Click **Add** in the FX chain window (or the + button)
2. Search for your instrument (e.g., "Serum", "Vital", "ReaSynth")
3. Double-click to add it **below** VEX

Your FX chain should now show:
```
1. VEX MIDI EXPRESSION
2. [Your Instrument]
```

> **Tip**: You can drag plugins up/down to reorder them. VEX must be **above** the instrument.

### Step 5: Configure VEX

1. Click on VEX in the FX chain to open its window
2. Add a mapping for your CC number:
   - Click **+ Add Mapping**
   - Set the CC number (e.g., CC1 for Mod Wheel, CC74 for Filter)
   - Choose a transform type (Bouncy, Spring, Warp, etc.)
3. Move your MIDI controller to verify input is received

### Step 6: Set Up MIDI Input

1. Right-click the track's **record arm button** (red circle)
2. Select **Input: MIDI** → **[Your MIDI Controller]** → **All Channels**
3. Arm the track for recording (click the record arm button)

### Step 7: Play!

Play your MIDI controller - the instrument receives transformed MIDI data through VEX!

---

## Routing Diagram

```
┌──────────────────────────────────────────────────────────┐
│                        REAPER                            │
│                                                          │
│  ┌─────────────────┐       ┌─────────────────────────┐  │
│  │ MIDI Controller │       │        Track            │  │
│  │                 │ ────> │                         │  │
│  │ (CC1, CC74...)  │ MIDI  │  ┌───────────────────┐  │  │
│  └─────────────────┘ Input │  │     FX Chain      │  │  │
│                            │  │                   │  │  │
│                            │  │  ┌─────────────┐  │  │  │
│                            │  │  │     VEX     │  │  │  │
│                            │  │  │   Plugin    │  │  │  │
│                            │  │  └──────┬──────┘  │  │  │
│                            │  │         │ MIDI    │  │  │
│                            │  │         ▼         │  │  │
│                            │  │  ┌─────────────┐  │  │  │
│                            │  │  │   Synth     │  │  │  │
│                            │  │  │  (Serum,    │  │  │  │
│                            │  │  │   Vital...) │  │  │  │
│                            │  │  └─────────────┘  │  │  │
│                            │  │                   │  │  │
│                            │  └─────────┬─────────┘  │  │
│                            │            │            │  │
│                            └────────────┼────────────┘  │
│                                         │               │
│                                   Audio Output          │
│                                         ▼               │
│                                      Master             │
└──────────────────────────────────────────────────────────┘
```

---

## MIDI Pass-Through (If Needed)

Most plugins pass MIDI through automatically. If your instrument isn't receiving MIDI from VEX:

1. In the FX chain, click the **I/O button** (or "2 in 2 out") on VEX
2. In the pin connector window, look for **MIDI Output**
3. Right-click and select **MIDI Output → Merge with MIDI bus**

This ensures VEX passes transformed MIDI to the next plugin in the chain.

---

## Important: Use Track FX, Not Input FX

REAPER has two FX locations:
- **Track FX** (regular FX button) - Use this for VEX
- **Input FX** (on the record input) - Avoid for CC processing

> **Warning**: The Input FX chain filters out MIDI CC data in some configurations. Always place VEX in the regular **Track FX** chain to ensure CC messages pass through correctly.

---

## Using Multiple VEX Instances

You can stack multiple VEX instances in the same FX chain:

```
1. VEX MIDI EXPRESSION (CC1 mapping)
2. VEX MIDI EXPRESSION (CC74 mapping)
3. [Your Instrument]
```

Each VEX processes different CCs independently. Alternatively, use a single VEX with multiple mappings.

---

## Trigger Mode - Generating MIDI Notes

VEX can generate MIDI notes based on CC input using **Trigger Mode**.

### Setup for Trigger Mode

1. Add VEX to the FX chain (Steps 1-4 above)
2. Add a mapping and set transform type to **"Trigger"**
3. Configure trigger parameters:
   - **Base Note**: The MIDI note to generate (C4 = 60)
   - **Sensitivity**: How easily triggers fire
   - **Velocity Source**: Fixed or dynamic (physics-based)
4. Add your instrument below VEX

Now CC movements generate MIDI notes that trigger your instrument!

---

## MIDI CC Mapping in Instruments

After VEX transforms your CC data, map it to instrument parameters:

### Most VST Instruments

1. Find the MIDI Learn function (often right-click on a parameter)
2. Select "MIDI Learn" or "CC Learn"
3. Move your controller through VEX
4. The mapping is created

### ReaSynth (REAPER's Built-in Synth)

ReaSynth responds to standard MIDI CCs:
- CC1 - Modulation
- CC7 - Volume
- CC10 - Pan

### Using REAPER's Parameter Modulation

1. Right-click any plugin parameter
2. Select **Parameter modulation/MIDI link**
3. Click **Link from MIDI or FX parameter**
4. Enable **MIDI** and set the CC number
5. Move your controller to confirm

---

## Saving FX Chains

Save your VEX + instrument setup for reuse:

1. In the FX chain window, click the **+** menu (or right-click)
2. Select **FX Chains → Save FX chain**
3. Name it (e.g., "VEX Bouncy + Serum")

To load later:
1. Open FX on any track
2. Go to **FX Chains** in the browser
3. Double-click your saved chain

---

## Troubleshooting

### VEX doesn't receive MIDI input

- Check the track's MIDI input is set to your controller
- Ensure the track is armed for recording
- Verify your controller is sending the correct CC number
- Check REAPER Preferences → MIDI Devices - ensure your controller is enabled

### Instrument doesn't respond to transformed MIDI

- Make sure VEX is **above** the instrument in the FX chain
- Check VEX's MIDI output routing (see "MIDI Pass-Through" section)
- Verify the instrument responds to the CC number you're transforming
- Look at VEX's output meter - it should show transformed values

### Audio but no transformation effect

- Confirm VEX has a mapping enabled for your CC number
- Verify the transform type is not "Linear" (passthrough)
- Check the mapping's input and output CC numbers match what you expect

### Latency issues

- VEX runs at sub-10ms latency
- If experiencing delay, reduce REAPER's audio buffer size in **Preferences → Audio → Device**
- Use 128-256 samples for lowest latency during performance

---

## Recording Transformed MIDI

When you record MIDI with VEX in the FX chain:

1. The **recorded MIDI** will be the **original, untransformed** data
2. VEX transforms it in real-time during playback
3. This lets you adjust VEX parameters after recording

To "print" the transformed MIDI:
1. Create a new track
2. Set its input to receive from the VEX track (using REAPER's routing)
3. Record on the new track to capture transformed MIDI

---

## Tips & Best Practices

1. **Save FX chains** - Create presets for your favorite VEX + instrument combinations

2. **Use track templates** - Save entire track setups including routing and FX chains

3. **Freeze tracks** - If CPU is an issue, freeze tracks you're not actively editing

4. **Parameter automation** - Automate VEX parameters using REAPER's envelope system

5. **MIDI monitoring** - Use ReaControlMIDI (included with REAPER) to monitor MIDI flow in the FX chain

6. **Screensets** - Save window layouts that include your FX chain view for quick access

---

## Support

For additional help:
- Email: contact@extrasensory.com
- Website: https://extrasensory.com

---

*VEX MIDI EXPRESSION by Extrasensory*
*Copyright 2025*
