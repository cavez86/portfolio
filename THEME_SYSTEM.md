# Theme System Documentation

## Overview

The portfolio now features a comprehensive theme system that showcases **6 different design alternatives**:

1. **Terminal** (Original) - Cyberpunk/hacker aesthetic with neon accents
2. **Brutalist** - Bold minimalism with stark black/white contrasts
3. **Glassmorphic** - Depth-rich design with frosted glass overlays
4. **Editorial** - Magazine-style layout with serif typography
5. **Kinetic** - Motion-first with animated typography
6. **Accessible** - WCAG AAA compliant with high contrast

## How It Works

### Theme Provider

The `ThemeProvider` component (`src/components/providers/ThemeProvider.tsx`) manages the current theme state:

- Uses React Context for global theme state
- Persists theme selection to localStorage with key `portfolio-theme`
- Applies theme via `data-theme` attribute on the document root
- Default theme: `terminal`

### Theme Selector

Users can switch themes via the `ThemeSelector` component in the header:

- Icon button with palette icon
- Opens dialog with dropdown selector
- Shows current theme name and description
- Supports both English and Italian translations

### Theme Files

Each theme is defined in its own CSS file under `src/app/themes/`:

- `brutalist.css` - Monochrome with red accent, sharp corners, no shadows
- `glassmorphic.css` - Gradient backgrounds, backdrop blur, rounded corners
- `editorial.css` - Cream background, serif headings, magazine layout
- `kinetic.css` - Dark with gradient text, smooth transitions
- `accessible.css` - Pure black/white, clear typography, large touch targets

### CSS Architecture

Themes override CSS custom properties using attribute selectors:

```css
[data-theme='brutalist'] {
  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-primary: #ff0000;
  /* ... other color variables */
}
```

Typography and effects are also theme-specific:

```css
[data-theme='brutalist'] body {
  font-family: -apple-system, sans-serif;
}

[data-theme='brutalist'] * {
  box-shadow: none !important;
  text-shadow: none !important;
}
```

## Usage

### Switching Themes

1. Click the **palette icon** in the header
2. Select a theme from the dropdown
3. Theme applies instantly and persists across sessions

### Adding a New Theme

1. Create a new CSS file in `src/app/themes/` (e.g., `mytheme.css`)
2. Define theme using `[data-theme='mytheme']` selectors
3. Import in `src/app/layout.tsx`
4. Add theme to `ThemeProvider.tsx` type definition
5. Add option to `ThemeSelector.tsx` THEME_OPTIONS array
6. Add translations to `messages/en.json` and `messages/it.json`

### Modifying Existing Themes

Edit the corresponding CSS file in `src/app/themes/`. Changes will apply immediately in development mode.

## Theme Characteristics

### Terminal (Default)

- **Colors**: Customizable hue (default green), dark background
- **Typography**: Geist Mono throughout, uppercase tracking
- **Effects**: Neon glows, shadows, high visual impact
- **Audience**: Developers, tech professionals

### Brutalist

- **Colors**: Pure black/white with red accent
- **Typography**: Bold sans-serif, tight spacing
- **Effects**: None - flat design
- **Audience**: Designers, artists, architects

### Glassmorphic

- **Colors**: Purple gradients with transparency
- **Typography**: Inter with variable weights
- **Effects**: Backdrop blur, neumorphic shadows
- **Audience**: UI/UX designers, luxury brands

### Editorial

- **Colors**: Cream background, black text, red spot color
- **Typography**: Playfair Display serif + Source Sans
- **Effects**: Minimal, clean magazine style
- **Audience**: Writers, photographers, publishers

### Kinetic

- **Colors**: Dark with cyan/magenta gradient text
- **Typography**: Inter with variable font features
- **Effects**: Smooth transitions, gradient animations
- **Audience**: Motion designers, creative studios

### Accessible

- **Colors**: Pure white/black, WCAG AAA 7:1+ contrast
- **Typography**: Atkinson Hyperlegible, generous spacing
- **Effects**: None, focus on clarity
- **Audience**: Universal - government, education, healthcare

## Technical Details

### Dependencies

No additional dependencies required. The theme system uses:

- React Context API
- CSS custom properties
- localStorage API
- Existing shadcn/ui components

### Performance

- Themes are CSS-only (no JavaScript runtime overhead)
- Theme switching is instant (no page reload)
- All theme CSS loaded on initial page load (~10KB total)
- localStorage ensures theme persists across sessions

### Browser Support

Works in all modern browsers supporting:

- CSS custom properties
- CSS attribute selectors
- localStorage API
- CSS backdrop-filter (glassmorphic theme)

### Accessibility

- Theme selector is keyboard navigable
- ARIA labels on all interactive elements
- Focus indicators preserved in all themes
- Accessible theme provides WCAG AAA compliance

## Related Files

- `src/components/providers/ThemeProvider.tsx` - Theme context provider
- `src/components/ThemeSelector.tsx` - Theme switcher UI component
- `src/app/themes/*.css` - Individual theme stylesheets
- `src/app/layout.tsx` - Theme CSS imports
- `messages/en.json`, `messages/it.json` - Translations
- `DESIGN_REVIEW.md` - Detailed design specifications for each alternative

## Future Enhancements

Possible improvements to the theme system:

1. **Theme Preview** - Show thumbnail preview of each theme before selecting
2. **Custom Themes** - Allow users to create custom color schemes
3. **Time-based Themes** - Auto-switch based on time of day
4. **Animation Control** - Per-theme animation speed settings
5. **Font Loading** - Dynamic font loading for theme-specific fonts
6. **Export Settings** - Share theme configuration via URL parameter
7. **A/B Testing** - Track which themes are most popular

## See Also

- [DESIGN_REVIEW.md](../DESIGN_REVIEW.md) - Complete design review and alternatives
- [Color Picker Component](../src/components/ColorPicker.tsx) - Hue customization for terminal theme
- [Tailwind Config](../tailwind.config.ts) - Base theme configuration
