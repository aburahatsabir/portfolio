/**
 * Local SVG Avatar Generator
 * Replaces ui-avatars.com API with local generation
 */

interface AvatarOptions {
  name: string;
  background?: string;
  color?: string;
  size?: number;
}

export function generateAvatar({ 
  name, 
  background = '0f172a', 
  color = 'fff',
  size = 128 
}: AvatarOptions): string {
  // Extract initials from name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Convert hex colors to RGB for better compatibility
  const bgColor = `#${background}`;
  const textColor = `#${color}`;

  // Calculate font size based on avatar size
  const fontSize = Math.round(size * 0.4);

  // Generate SVG
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}" rx="${size / 2}"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="${textColor}"
        font-family="Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
        font-size="${fontSize}"
        font-weight="600"
      >${initials}</text>
    </svg>
  `.trim();

  // Return as data URI
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Pre-generate common avatars for constants
export const AVATARS = {
  PT: generateAvatar({ name: 'PT', background: '0f172a', color: 'fff' }),
  DI: generateAvatar({ name: 'DI', background: '2563eb', color: 'fff' }),
  IC: generateAvatar({ name: 'IC', background: '64748b', color: 'fff' }),
  MR: generateAvatar({ name: 'MR', background: 'f1f5f9', color: '0f172a' }),
  SK: generateAvatar({ name: 'SK', background: 'f1f5f9', color: '0f172a' }),
  DL: generateAvatar({ name: 'DL', background: 'f1f5f9', color: '0f172a' }),
  JP: generateAvatar({ name: 'JP', background: 'f1f5f9', color: '0f172a' }),
  EC: generateAvatar({ name: 'EC', background: 'f1f5f9', color: '0f172a' }),
  HL: generateAvatar({ name: 'HL', background: '2563eb', color: 'fff' }),
  FW: generateAvatar({ name: 'FW', background: '64748b', color: 'fff' }),
};
