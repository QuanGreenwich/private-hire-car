<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Private Hire Car - Luxury Travel App 🚗

Ứng dụng đặt xe sang cao cấp với giao diện hiện đại, hỗ trợ đặt xe sân bay, chauffeur hire và xe địa phương.

## 🛠️ Công nghệ sử dụng

| Hạng mục         | Công nghệ         | Lý do chọn                                                  |
| ---------------- | ----------------- | ----------------------------------------------------------- |
| **Nền tảng**     | Web App (Chrome)  | Mobile View trên trình duyệt, nhẹ hơn Android Studio 10 lần |
| **IDE**          | VS Code           | Miễn phí, nhẹ, hỗ trợ IntelliSense tốt                      |
| **Ngôn ngữ**     | TypeScript (ES6+) | Type-safe, dễ debug, tài liệu phong phú                     |
| **Framework**    | React.js + Vite   | Chuẩn công nghiệp, dễ chia component cho team               |
| **Bản đồ**       | React Leaflet     | 100% miễn phí (OpenStreetMap), không cần API key            |
| **UI Framework** | Tailwind CSS      | Code UI nhanh, không cần viết CSS thuần                     |
| **Dữ liệu**      | Mock JSON         | Không cần Backend/Database trong giai đoạn phát triển       |

## Yêu cầu hệ thống

- **Node.js** phiên bản 18.x trở lên
- **npm** hoặc **yarn** package manager

## Cài đặt và chạy dự án

### Bước 1: Clone hoặc tải dự án về máy

```bash
git clone <repository-url>
cd private-hire-car
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ tự động cài đặt tất cả các packages cần thiết từ `package.json`:

**Dependencies chính:**

- `react` ^19.2.3 - Framework UI
- `react-dom` ^19.2.3 - React DOM rendering
- `react-leaflet` - React components cho Leaflet maps
- `leaflet` - Thư viện bản đồ OpenStreetMap
- `lucide-react` ^0.562.0 - Icon library

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
