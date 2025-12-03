# VEX MIDI EXPRESSION - Ableton Live Setup Guide

This guide explains how to route MIDI through VEX MIDI EXPRESSION in Ableton Live to transform your MIDI controller data and send it to instruments.

---

## Important: Ableton MIDI Routing Requirement

**Ableton Live does not support third-party VST3 MIDI effects in the device chain before instruments.** This is an Ableton limitation—only Ableton's built-in MIDI effects (Arpeggiator, Chord, Scale, etc.) can be placed before instruments on the same track.

VEX works perfectly in Ableton using **MIDI track routing**, which is the standard method for all third-party MIDI effect plugins. This guide shows you how to set it up.

> **Note**: Other DAWs like Bitwig, Reaper, and Cubase allow VEX to be placed directly before instruments on the same track.

---

## How It Works

VEX receives MIDI input, transforms it using physics-based processing, and outputs transformed MIDI. In Ableton, you route this output to a separate instrument track.

**Signal Flow:**
```
MIDI Controller → VEX Track → [MIDI Routing] → Instrument Track → Audio Output
```

---

## Setup Guide

### Step 1: Create the VEX Track

1. Create a new **MIDI Track** (Cmd+Shift+T / Ctrl+Shift+T)
2. Name it "VEX" or "VEX Transform" (double-click the track name)
3. Load **VEX MIDI EXPRESSION** on this track:
   - In the Browser, go to **Plug-ins → VST3** (or **Audio Units** on macOS)
   - Find "VEX MIDI EXPRESSION"
   - Drag it onto the track

### Step 2: Set Up MIDI Input on VEX Track

1. In the track's **I/O Section** (press Cmd+Opt+I / Ctrl+Alt+I if not visible):
   - **MIDI From**: Select your MIDI controller (e.g., "Sensel Morph", "Launchpad", etc.)
   - **Channel**: "All Channels" (or specific channel if needed)
   - **Monitor**: Set to **"In"** to always receive MIDI

> **Important: Disable Control Surface for Your Controller**
>
> Ableton may intercept your MIDI controller's data for its own remote control features, preventing VEX from receiving input. To fix this:
>
> 1. Go to **Live → Preferences → Link, Tempo & MIDI** (or **Options → Preferences** on Windows)
> 2. In the **Control Surface** section, check if your MIDI controller is assigned as a control surface
> 3. If your controller appears in any Control Surface dropdown, set that slot to **"None"**
> 4. Alternatively, in the **MIDI Ports** section below, disable **Remote** for your controller's input (keep **Track** enabled)
>
> This ensures Ableton passes the raw MIDI data to tracks instead of using it for built-in parameter control.

### Step 3: Configure VEX

1. Open VEX MIDI EXPRESSION (double-click the device)
2. Add a mapping for your CC number:
   - Click **+ Add Mapping**
   - Set the CC number (e.g., CC1 for Mod Wheel, CC74 for Filter)
   - Choose a transform type (Bouncy, Spring, Warp, etc.)
3. Move your controller to verify input is received (you'll see the input meter respond)

### Step 4: Create the Instrument Track

1. Create another **MIDI Track** (Cmd+Shift+T / Ctrl+Shift+T)
2. Name it "Synth" (or your instrument name)
3. Load your instrument (e.g., Analog, Wavetable, Serum, etc.)

### Step 5: Route VEX Output to Instrument

On the **"Synth" instrument track** (not the VEX track):
1. In the I/O Section, find the **MIDI From** dropdown (top dropdown)
2. Change it from "All Ins" to **"VEX"** (your VEX track name)
3. Set the second dropdown to **"Post FX"** to receive MIDI after VEX processing
4. Set **Monitor** to **"In"**

### Step 6: Arm and Play

1. **Arm** the "VEX" track for recording (click the arm button)
2. The "Synth" track does NOT need to be armed - it receives routed MIDI from VEX
3. Play your MIDI controller - the instrument responds with transformed CC data!

---

## Routing Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     ABLETON LIVE                            │
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │ MIDI Controller │         │   VEX Track     │           │
│  │                 │ ──────> │                 │           │
│  │ (CC1, CC74...)  │  MIDI   │ ┌─────────────┐ │           │
│  └─────────────────┘  Input  │ │     VEX     │ │           │
│                              │ │   Plugin    │ │           │
│                              │ └─────────────┘ │           │
│                              └────────┬────────┘           │
│                                       │                     │
│                    "MIDI From: VEX Track (Post FX)"         │
│                                       │                     │
│                                       ▼                     │
│                              ┌─────────────────┐           │
│                              │  Synth Track    │           │
│                              │ ┌─────────────┐ │           │
│                              │ │   Synth     │ │           │
│                              │ │  (Analog,   │ │──> Audio  │
│                              │ │  Serum...)  │ │   Output  │
│                              │ └─────────────┘ │           │
│                              └─────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## Multiple Instruments from One VEX

To route one VEX instance to multiple instruments:

1. Create the VEX track (Steps 1-3 above)
2. Create multiple instrument tracks
3. On **each** instrument track, set **MIDI From** to your VEX track with "Post FX"

All instruments will receive the same transformed MIDI data.

---

## Trigger Mode - Generating MIDI Notes

VEX can also generate MIDI notes based on CC input using **Trigger Mode**. This converts continuous CC data into note triggers.

### Setup for Trigger Mode

1. Follow Steps 1-3 above to create and configure the VEX track
2. In VEX, add a mapping and set transform type to **"Trigger"**
3. Configure trigger parameters:
   - **Base Note**: The MIDI note to generate (C4 = 60)
   - **Sensitivity**: How easily triggers fire
   - **Velocity Source**: Fixed or dynamic (physics-based)
4. Create an instrument track and route from VEX (Steps 4-6 above)

Now CC movements will trigger MIDI notes on the destination instrument!

---

## MIDI CC Mapping in Instruments

After routing VEX output to your instrument, you need to map the CC to a parameter:

### Ableton Instruments (Analog, Wavetable, Drift, etc.)

1. Click **Configure** mode (top right of device)
2. Move the parameter you want to control
3. Move your MIDI controller (VEX will transform and send the CC)
4. The mapping is created automatically
5. Click **Configure** again to exit

### Third-Party VST Instruments

Most synths have built-in MIDI Learn:
1. Right-click the parameter → "MIDI Learn" (or similar)
2. Move your controller through VEX
3. The mapping is created

Alternatively, use Ableton's MIDI Map mode:
1. Press **Cmd+M** (Mac) / **Ctrl+M** (Windows)
2. Click the parameter
3. Move your controller
4. Press **Cmd+M** / **Ctrl+M** again to exit

---

## Troubleshooting

### VEX doesn't receive MIDI input

- **Most common cause**: Ableton is intercepting your controller as a Control Surface
  - Go to **Preferences → Link, Tempo & MIDI**
  - Remove your controller from any **Control Surface** slots (set to "None")
  - Or disable **Remote** for your controller in the MIDI Ports section
- Check **MIDI From** is set to your controller
- Ensure **Monitor** is set to "In"
- Verify your controller is sending on the correct CC number
- Check MIDI preferences - ensure **Track** is enabled for your controller's input

### Instrument doesn't respond to transformed MIDI

- Verify **MIDI From** on the instrument track is set to your VEX track
- Make sure the second dropdown shows **"Post FX"**
- Ensure the instrument track's **Monitor** is set to "In"
- Check that the CC number VEX outputs matches what the instrument expects
- The VEX track should be armed, the instrument track should NOT be armed

### Audio but no transformation effect

- Check VEX has a mapping enabled for your CC number
- Verify the transform type is not "Linear" (passthrough)
- Look at VEX's output meter - it should show transformed values

### Latency issues

- VEX runs at sub-10ms latency
- If experiencing delay, check Ableton's buffer size (Preferences → Audio)
- Reduce buffer size for lower latency (256-512 samples recommended)

---

## Recording Transformed MIDI

To record the transformed MIDI data:

1. Arm the **instrument track** for recording (not the VEX track)
2. Create a new MIDI clip or record into the arrangement
3. Press Record and play your controller
4. The recorded clip will contain the transformed CC data

---

## Tips & Best Practices

1. **Name your tracks clearly** - "VEX CC74" or "VEX Filter" makes routing obvious

2. **Use color coding** - Give VEX tracks a distinctive color (e.g., yellow/green accent)

3. **Save as template** - Once you have a working setup, save it as a template for future projects

4. **Group related tracks** - Keep VEX and its target instruments in a group for organization

5. **Monitor settings** - Always set VEX track monitor to "In" for real-time use

---

## Support

For additional help:
- Email: contact@extrasensory.com
- Website: https://extrasensory.com

---

*VEX MIDI EXPRESSION by Extrasensory*
*Copyright 2025*
