# Project Structure

This project has been reorganized for better maintainability and scalability.

## Directory Structure

````
private-hire-car/
├── public/                 # Static assets (future)
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/        # Shared UI components
│   │   │   └── BottomNav.tsx
│   │   ├── map/           # Map-related components
│   │   │   ├── Map.tsx
│   │   │   ├── MapBackground.tsx
│   │   │   └── MapComponents.tsx
│   │   └── index.ts       # Barrel exports
│   │
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   │   ├── AuthScreen.tsx
│   │   │   └── SignUpScreen.tsx
│   │   ├── booking/       # Booking flow screens
│   │   │   ├── BookingAirportScreen.tsx
│   │   │   ├── BookingChauffeurScreen.tsx
│   │   │   ├── BookingHotelScreen.tsx
│   │   │   ├── BookingLocalScreen.tsx
│   │   │   └── BookingMapScreen.tsx
│   │   ├── main/          # Main app screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ActivityScreen.tsx
│   │   │   ├── AccountScreen.tsx
│   │   │   ├── ExploreScreen.tsx
│   │   │   ├── NotificationsScreen.tsx
│   │   │   └── SplashScreen.tsx
│   │   └── index.ts       # Barrel exports
│   │
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── constants/         # App constants
│   │   └── index.ts
│   │
│   ├── styles/            # Global styles
│   │   └── index.css
│   │
│   ├── data/              # Mock data/JSON files
│   │   ├── bookings.json
│   │   ├── drivers.json
│   │   └── locations.json
│   │
│   ├── App.tsx            # Root component
│   └── main.tsx           # App entry point
│
├── index.html             # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.js     # Tailwind config
└── README.md              # This file

## Import Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of:
import { Screen } from '../../types';
import BottomNav from '../../components/common/BottomNav';

// Use:
import { Screen } from '@/types';
import { BottomNav } from '@/components';
````

## Barrel Exports

Components and screens use barrel exports (`index.ts`) for convenient importing:

```typescript
// Components
import { BottomNav, Map, MapMarker } from "@/components";

// Screens
import { HomeScreen, AuthScreen, BookingLocalScreen } from "@/screens";
```

## Benefits of This Structure

1. **Clear Separation**: Different types of files are organized into logical folders
2. **Scalability**: Easy to add new features without cluttering
3. **Maintainability**: Finding files is intuitive and consistent
4. **Clean Imports**: Barrel exports and path aliases reduce import complexity
5. **Team Collaboration**: Standard structure is easier for teams to navigate

## Adding New Files

- **New Component**: Add to `src/components/common/` or create a new category
- **New Screen**: Add to appropriate folder in `src/screens/`
- **New Type**: Add to `src/types/index.ts`
- **New Constant**: Add to `src/constants/index.ts`

Remember to update barrel exports in `index.ts` files when adding new components or screens.
