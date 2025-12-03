# VEX MIDI EXPRESSION - Logic Pro Setup Guide

This guide explains how to use VEX MIDI EXPRESSION in Logic Pro to transform your MIDI controller data.

---

## Logic Pro MIDI FX Support

**Good news!** Unlike some other DAWs, Logic Pro has native support for third-party MIDI FX plugins. VEX is built as an Audio Unit with the `aumi` (MIDI Processor) type, which means it appears directly in Logic's **MIDI FX slot** and can be placed before instruments on the same track.

This provides the simplest possible workflow - no complex MIDI routing required.

---

## How It Works

In Logic Pro, software instrument tracks have a **MIDI FX slot** above the instrument slot. MIDI flows through these slots in order:

```
MIDI Input → [MIDI FX Slot] → [Instrument Slot] → [Audio FX] → Output
```

VEX sits in the MIDI FX slot, transforming your MIDI data before it reaches the instrument.

---

## Setup Guide

### Step 1: Create a Software Instrument Track

1. Go to **Track → New Software Instrument Track** (or press Option+Cmd+S)
2. Choose an instrument (e.g., Alchemy, Retro Synth, or any third-party synth)
3. Click **Create**

### Step 2: Insert VEX in the MIDI FX Slot

1. Look at the **Channel Strip** on the left side of the screen (or in the Mixer)
2. Find the **MIDI FX** slot - it's located **above** the Instrument slot
3. Click on the MIDI FX slot
4. Navigate to: **AU MIDI-controlled Effects → Extrasensory → VEX MIDI EXPRESSION**
5. Click to insert VEX

Your channel strip should now show:
```
[MIDI FX: VEX MIDI EXPRESSION]
         ↓
[Instrument: Your Synth]
         ↓
[Audio FX slots...]
```

### Step 3: Configure VEX

1. Double-click the VEX slot to open the plugin window
2. Add a mapping for your CC number:
   - Click **+ Add Mapping**
   - Set the CC number (e.g., CC1 for Mod Wheel, CC74 for Filter)
   - Choose a transform type (Bouncy, Spring, Warp, etc.)
3. Move your MIDI controller to verify input is received (you'll see the input meter respond)

### Step 4: Play!

1. Make sure your MIDI controller is connected and selected in Logic's preferences
2. Record-enable the track (press R on the track header)
3. Play your MIDI controller - the instrument receives transformed MIDI data!

---

## Routing Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     LOGIC PRO                            │
│                                                          │
│  ┌─────────────────┐       ┌─────────────────────────┐  │
│  │ MIDI Controller │       │  Software Instrument    │  │
│  │                 │ ────> │       Track             │  │
│  │ (CC1, CC74...)  │ MIDI  │                         │  │
│  └─────────────────┘ Input │  ┌───────────────────┐  │  │
│                            │  │    MIDI FX Slot   │  │  │
│                            │  │  ┌─────────────┐  │  │  │
│                            │  │  │     VEX     │  │  │  │
│                            │  │  │   Plugin    │  │  │  │
│                            │  │  └──────┬──────┘  │  │  │
│                            │  └─────────┼─────────┘  │  │
│                            │            │            │  │
│                            │            ▼            │  │
│                            │  ┌───────────────────┐  │  │
│                            │  │  Instrument Slot  │  │  │
│                            │  │  ┌─────────────┐  │  │  │
│                            │  │  │   Synth     │  │  │  │
│                            │  │  │  (Alchemy,  │  │  │  │
│                            │  │  │  Serum...)  │  │  │  │
│                            │  │  └─────────────┘  │  │  │
│                            │  └─────────┬─────────┘  │  │
│                            │            │            │  │
│                            └────────────┼────────────┘  │
│                                         │               │
│                                   Audio Output          │
│                                         ▼               │
│                                      Stereo Out         │
└──────────────────────────────────────────────────────────┘
```

---

## Stacking Multiple MIDI FX

Logic Pro allows you to stack multiple MIDI FX plugins. To add more:

1. Hover over the top or bottom edge of an existing MIDI FX slot
2. When you see a **green line**, click to insert another MIDI FX slot
3. Insert additional VEX instances or other MIDI FX plugins

MIDI flows through them in order from top to bottom.

---

## Using Multiple VEX Instances for Different CCs

If you want to transform multiple CC numbers with different settings:

**Option 1: Single VEX with Multiple Mappings**
- One VEX instance can handle multiple CC mappings simultaneously
- Each mapping can have its own transform type and parameters

**Option 2: Multiple VEX Instances**
- Insert multiple VEX plugins in the MIDI FX chain
- Each handles different CCs with completely separate settings

---

## Trigger Mode - Generating MIDI Notes

VEX can also generate MIDI notes based on CC input using **Trigger Mode**.

### Setup for Trigger Mode

1. Insert VEX in the MIDI FX slot (Steps 1-2 above)
2. Add a mapping and set transform type to **"Trigger"**
3. Configure trigger parameters:
   - **Base Note**: The MIDI note to generate (C4 = 60)
   - **Sensitivity**: How easily triggers fire
   - **Velocity Source**: Fixed or dynamic (physics-based)
4. Play your CC controller - VEX generates MIDI notes that trigger the instrument!

---

## MIDI CC Mapping in Instruments

After VEX transforms your CC data, you need to map it to instrument parameters:

### Logic Pro Instruments (Alchemy, Retro Synth, etc.)

Most Logic instruments respond to standard MIDI CCs automatically:
- **CC1** (Mod Wheel) - Often mapped to vibrato or filter
- **CC74** - Brightness/Filter cutoff
- **CC71** - Resonance

For custom mappings in Alchemy:
1. Click the **Mod Matrix** or modulation section
2. Assign a CC source to your target parameter
3. Set the modulation amount

### Third-Party Instruments

Most synths have built-in MIDI Learn:
1. Right-click the parameter → "MIDI Learn" (or similar)
2. Move your controller through VEX
3. The mapping is created

---

## Troubleshooting

### VEX doesn't appear in MIDI FX menu

- Ensure VEX is installed in `/Library/Audio/Plug-Ins/Components/`
- Go to **Logic Pro → Preferences → Plug-in Manager**
- Click **Reset & Rescan Selection** to rescan Audio Units
- Look for "VEX MIDI EXPRESSION" in the list - make sure it's not disabled

### VEX doesn't receive MIDI input

- Check that your MIDI controller is selected in **Logic Pro → Preferences → MIDI**
- Ensure the track is record-enabled (R button)
- Verify your controller is sending the correct CC number
- Try creating a new software instrument track and reinserting VEX

### Instrument doesn't respond to transformed MIDI

- Verify VEX has a mapping enabled for your CC number
- Check that the transform type is not "Linear" (passthrough)
- Look at VEX's output meter - it should show transformed values
- Some Logic instruments may not respond to all CCs - check the instrument's documentation

### Plugin validation failed

If Logic reports VEX failed validation:
1. Go to **Logic Pro → Preferences → Plug-in Manager**
2. Find VEX in the list
3. Select it and click **Reset & Rescan Selection**
4. If issues persist, try removing and reinstalling the plugin

### Latency issues

- VEX runs at sub-10ms latency
- If experiencing delay, check Logic's buffer size in **Preferences → Audio → I/O Buffer Size**
- Use 128 or 256 samples for lowest latency during performance

---

## Recording Transformed MIDI

When you record MIDI in Logic with VEX in the MIDI FX slot:

1. The **recorded MIDI** will be the **original, untransformed** data
2. VEX transforms it in real-time during playback
3. This lets you adjust VEX parameters after recording without re-recording

To "print" the transformed MIDI:
1. Create a new software instrument track
2. Set its input to the output of the VEX track (using an IAC bus or similar)
3. Record on the new track to capture the transformed MIDI

---

## Tips & Best Practices

1. **Save channel strip settings** - Once you have a VEX + instrument combo you like, save it as a channel strip setting for reuse

2. **Use Track Stacks** - Group related tracks in a Track Stack for organization

3. **Automate VEX parameters** - VEX parameters can be automated in Logic for evolving transformations

4. **Compare with bypass** - Use the bypass button on VEX to A/B compare the transformed vs. original signal

5. **CPU efficiency** - VEX is lightweight, but if using many instances, consider freezing tracks you're not actively editing

---

## Support

For additional help:
- Email: contact@extrasensory.com
- Website: https://extrasensory.com

---

*VEX MIDI EXPRESSION by Extrasensory*
*Copyright 2025*
