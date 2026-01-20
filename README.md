# Private Hire Car - Ứng dụng đặt xe 🚗

Ứng dụng đặt xe cao cấp với 3 loại dịch vụ: Local Journey, Airport Transfer, và Hotel Pickup.

## Cách chạy app

### 1. Cài đặt

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

App sẽ chạy tại: **http://localhost:3000**

### 3. Build production (nếu cần)

```bash
npm run build
npm run preview
```

## Workflow hoạt động

### 📍 **Local Journey** (Đặt xe trong thành phố)

1. Chọn điểm đón từ 25 địa điểm ở London
2. Chọn điểm đến (khác với điểm đón)
3. Chọn loại xe: Standard / Executive / Luxury
4. Xem route trên map với khoảng cách và giá thực tế
5. Bấm "Book" → Chuyển sang Activity screen

### ✈️ **Airport Transfer** (Đặt xe đón sân bay)

1. Chọn sân bay: Heathrow / Gatwick / Stansted
2. Nhập thông tin chuyến bay (flight number, terminal)
3. Chọn loại xe
4. Tùy chọn Meet & Greet (+£15)
5. Giá cố định theo loại xe: £45-85
6. Bấm "Book Transfer" → Activity screen

### 🏨 **Hotel Pickup** (Đón tại khách sạn)

1. Chọn hotel pickup từ 10 khách sạn nổi tiếng London
2. Chọn điểm đến (có thể là hotel khác)
3. Chọn loại xe
4. Xem route và giá động
5. Bấm "Book" → Activity screen

### 🚕 **Activity Screen** (Theo dõi chuyến đi)

- Hiển thị thông tin tài xế: Tên, xe, màu (random mỗi lần đặt)
- Xem route trên map từ pickup → destination
- Chat với tài xế
- Gọi điện thoại cho tài xế
- **Cancel Trip**: Hủy chuyến với phí £5

## Tính năng chính

✅ **Real routing**: Dùng OSRM API tính route thực tế trên đường  
✅ **Dynamic pricing**: Giá thay đổi theo khoảng cách và loại xe  
✅ **25 địa điểm London**: Bao gồm ga tàu, bảo tàng, landmark  
✅ **10 khách sạn 5 sao**: The Ritz, The Savoy, Claridge's...  
✅ **3 loại xe**: Standard SUV, Executive Sedan, Luxury MPV  
✅ **Fleet thực tế**: 5 model mỗi loại (Mercedes, BMW, Audi, Jaguar, Lexus...)  
✅ **Random vehicle**: Mỗi lần đặt được assign xe và màu ngẫu nhiên  
✅ **Interactive map**: MapLibre GL với real route display  
✅ **Cancel booking**: Hủy chuyến và reset state

## Giá xe

| Loại xe               | Base Fare | Per Mile | Multiplier |
| --------------------- | --------- | -------- | ---------- |
| **Standard** (SUV)    | £3.50     | £2.50    | x1.0       |
| **Executive** (Sedan) | £3.50     | £3.50    | x1.4       |
| **Luxury** (MPV)      | £3.50     | £4.50    | x1.8       |

**Airport Transfer**: Giá cố định £45/£65/£85 + £15 Meet & Greet

## Tech Stack

- React 19.2.3 + TypeScript
- Vite 6.2.0
- MapLibre GL 4.7.1
- Tailwind CSS v4
- OSRM Routing API
- Lucide React Icons

## Cấu trúc project

```
src/
├── screens/
│   ├── booking/           # Booking screens
│   │   ├── BookingLocalScreen.tsx
│   │   ├── BookingAirportScreen.tsx
│   │   └── BookingHotelScreen.tsx
│   └── main/              # Main screens
│       ├── ActivityScreen.tsx
│       ├── HomeScreen.tsx
│       └── ...
├── components/            # Reusable components
│   ├── Map.tsx
│   ├── MapRoute.tsx
│   └── BottomNav.tsx
├── utils/
│   └── routing.ts         # OSRM API integration
├── constants/
│   ├── index.ts           # App constants
│   └── types.ts           # TypeScript types
└── App.tsx                # Main app with routing
```

## Lưu ý

- App chạy trong browser, responsive cho mobile view
- Không cần backend hay database
- Route calculation cần internet (dùng OSRM API)
- Data được lưu trong App state, reload sẽ mất

---

**Phát triển bởi**: COMP 1807 Team  
**Môn học**: Agile Development with SCRUM

**Dev Dependencies:**

- `@vitejs/plugin-react` ^5.0.0 - Vite React plugin
- `typescript` ~5.8.2 - TypeScript compiler
- `vite` ^6.2.0 - Build tool
- `@types/node` ^22.14.0 - Node.js type definitions
- `@types/leaflet` - Leaflet type definitions
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS post-processor
- `autoprefixer` - PostCSS plugin

### Bước 3: Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại:

- **Local**: http://localhost:3000/
- **Network**: http://[your-ip]:3000/

### Bước 4: Build cho production

```bash
npm run build
```

### Bước 5: Preview production build

```bash
npm run preview
```

## Cấu trúc dự án

```
private-hire-car/
├── components/          # React components tái sử dụng
│   ├── BottomNav.tsx   # Navigation bar phía dưới
│   ├── MapBackground.tsx # Background map component
│   └── Map.tsx         # 🆕 Leaflet Map với markers
├── screens/             # Các màn hình chính
│   ├── HomeScreen.tsx
│   ├── AuthScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── BookingAirportScreen.tsx
│   ├── BookingChauffeurScreen.tsx
│   ├── BookingLocalScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── ActivityScreen.tsx
│   ├── AccountScreen.tsx
│   └── NotificationsScreen.tsx
├── data/                # 🆕 Mock data JSON
│   ├── drivers.json    # Danh sách 5 tài xế
│   ├── locations.json  # 10 địa điểm London
│   └── bookings.json   # Lịch sử đặt xe mẫu
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── index.css            # 🆕 Tailwind CSS imports
├── types.ts             # TypeScript type definitions
├── constants.ts         # App constants
├── package.json         # Dependencies và scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # 🆕 Tailwind configuration
└── postcss.config.js    # 🆕 PostCSS configuration
```

## 🗂️ Mock Data

### `data/drivers.json` (5 tài xế)

```json
{
  "id": "driver-001",
  "name": "James Williams",
  "rating": 4.9,
  "vehicleType": "Mercedes S-Class",
  "currentLocation": { "lat": 51.5074, "lng": -0.1278 },
  "available": true
}
```

### `data/locations.json` (10 địa điểm)

- Sân bay: Heathrow, Gatwick, London City
- Landmarks: Buckingham Palace, Tower of London, The Shard
- Khu vực: Canary Wharf, Oxford Street, Wembley

### `data/bookings.json`

Lịch sử đặt xe với trạng thái: completed, in-progress, scheduled, cancelled

## 🗺️ Sử dụng Map Component

```tsx
import Map from './components/Map';

// Hiển thị bản đồ London với tài xế
<Map />

// Tùy chỉnh
<Map center={[51.5074, -0.1278]} zoom={12} showDrivers={true} />
```

## 🎨 Tailwind CSS

### Custom Colors

```tsx
// Màu vàng sang trọng
<div className="bg-luxury-gold text-white">Premium</div>

// Màu bạc
<div className="text-luxury-silver">Elite</div>

// Primary
<div className="bg-primary hover:bg-primary-light">Button</div>
```

### Utility Classes

```tsx
<div className="flex items-center justify-center h-screen bg-gray-100">
  <button className="px-6 py-3 bg-luxury-gold text-white rounded-lg hover:opacity-90">
    Book Now
  </button>
</div>
```

## Scripts có sẵn

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build ứng dụng cho production
- `npm run preview` - Preview production build locally

## Lưu ý

- Không cần cài đặt thêm bất kỳ file nào khác
- Tất cả dependencies sẽ được cài tự động qua `npm install`
- Port mặc định là 3000, có thể thay đổi trong file `vite.config.ts`
- Dự án sử dụng Vite để build và hot-reload nhanh chóng

## Troubleshooting

### Nếu gặp lỗi khi chạy:

1. **Xóa node_modules và reinstall:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Kiểm tra phiên bản Node.js:**

   ```bash
   node --version
   ```

   Đảm bảo >= 18.x

3. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

## Tính năng

- ✅ Đặt xe sân bay (Airport Transfer)
- ✅ Thuê tài xế riêng (Chauffeur Hire)
- ✅ Đặt xe địa phương (Local Rides)
- ✅ Bản đồ OpenStreetMap với React Leaflet
- ✅ Hiển thị vị trí tài xế real-time
- ✅ Mock data cho drivers, locations, bookings
- ✅ Tailwind CSS styling
- ✅ Responsive design cho Mobile View

## 💡 Hướng dẫn phát triển

### 1. Xem Mobile View

```
F12 > Toggle Device Toolbar (Ctrl+Shift+M)
Chọn iPhone/Android để test responsive
```

### 2. Import Mock Data

```tsx
import driversData from "./data/drivers.json";
import locationsData from "./data/locations.json";
import bookingsData from "./data/bookings.json";
```

### 3. Team Workflow

- Mỗi người làm 1-2 screens/components
- Commit thường xuyên với Git
- Test trên Mobile View trước khi merge

## 👥 Phân công gợi ý

1. **Member 1**: HomeScreen + Map integration
2. **Member 2**: BookingAirportScreen + locations autocomplete
3. **Member 3**: ActivityScreen + bookings history
4. **Member 4**: AccountScreen + driver profiles
5. **Member 5**: ExploreScreen + locations listing
6. **Member 6**: UI Components + Tailwind styling

- ✅ Đặt xe địa phương (Local Rides)
- ✅ Quản lý tài khoản
- ✅ Theo dõi hoạt động
- ✅ Thông báo
- ✅ Giao diện responsive và hiện đại

## Công nghệ sử dụng

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling (via inline classes)
- **Lucide React** - Icons

---

Developed with ❤️ for COMP 1807 - Agile Development with SCRUM
